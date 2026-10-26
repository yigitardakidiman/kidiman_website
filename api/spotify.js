import fs from 'fs';
import path from 'path';

export const config = {
  runtime: 'nodejs',
};

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// Persist cache across warm serverless invocations and Vite dev server reloads
const cache = (globalThis.__spotifyApiCache ??= {
  accessToken: null,
  tokenExpiresAt: 0,
  lastData: null,
  lastDataAt: 0,
  credentials: null,
});

const RESPONSE_CACHE_TTL_MS = 4000; // 4 seconds in-memory deduplication

function getCredentials() {
  if (
    cache.credentials?.client_id &&
    cache.credentials?.client_secret &&
    cache.credentials?.refresh_token
  ) {
    return cache.credentials;
  }

  let client_id = process.env.SPOTIFY_CLIENT_ID;
  let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (client_id === 'undefined') client_id = undefined;
  if (client_secret === 'undefined') client_secret = undefined;
  if (refresh_token === 'undefined') refresh_token = undefined;

  // Read from .env file if not already in process.env
  if (!client_id || !client_secret || !refresh_token) {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, 'utf-8');
        envFile.split(/\r?\n/).forEach((line) => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match) {
            const key = match[1];
            let val = match[2] || '';
            val = val.trim().replace(/(^['"]|['"]$)/g, '');
            if (key === 'SPOTIFY_CLIENT_ID') client_id = val;
            if (key === 'SPOTIFY_CLIENT_SECRET') client_secret = val;
            if (key === 'SPOTIFY_REFRESH_TOKEN') refresh_token = val;
          }
        });
      }
    } catch (e) {
      console.warn('Could not read .env file:', e.message);
    }
  }

  if (client_id && client_secret && refresh_token) {
    cache.credentials = { client_id, client_secret, refresh_token };
  }

  return { client_id, client_secret, refresh_token };
}

async function getAccessToken(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cache.accessToken && now < cache.tokenExpiresAt) {
    return cache.accessToken;
  }

  const { client_id, client_secret, refresh_token } = getCredentials();

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Spotify credentials in environment variables or .env file');
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} ${errorText}`);
  }

  const tokenData = await response.json();
  const expiresInMs = ((tokenData.expires_in || 3600) - 60) * 1000; // 60s safety margin

  cache.accessToken = tokenData.access_token;
  cache.tokenExpiresAt = now + Math.max(expiresInMs, 60_000);

  return cache.accessToken;
}

export async function getSpotifyData() {
  const now = Date.now();
  if (cache.lastData && now - cache.lastDataAt < RESPONSE_CACHE_TTL_MS) {
    return cache.lastData;
  }

  try {
    let access_token = await getAccessToken(false);

    // 1. Try to get currently playing song
    let nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // If token was revoked early (401), force refresh once
    if (nowPlayingRes.status === 401) {
      access_token = await getAccessToken(true);
      nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        const result = {
          isPlaying: song.is_playing,
          isRecentlyPlayed: !song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((artist) => artist.name).join(', '),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images?.[0]?.url || '',
          songUrl: song.item.external_urls?.spotify || 'https://open.spotify.com',
          progressMs: song.progress_ms,
          durationMs: song.item.duration_ms,
        };
        cache.lastData = result;
        cache.lastDataAt = Date.now();
        return result;
      }
    } else if (nowPlayingRes.status !== 204) {
      const errorText = await nowPlayingRes.text();
      console.warn(`[Spotify API] Currently playing returned status ${nowPlayingRes.status}:`, errorText);
    }

    // 2. If nothing currently playing, get recently played track
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedRes.status === 200) {
      const recent = await recentlyPlayedRes.json();
      const item = recent.items?.[0];
      if (item && item.track) {
        const result = {
          isPlaying: false,
          isRecentlyPlayed: true,
          title: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(', '),
          album: item.track.album.name,
          albumImageUrl: item.track.album.images?.[0]?.url || '',
          songUrl: item.track.external_urls?.spotify || 'https://open.spotify.com',
          playedAt: item.played_at,
          durationMs: item.track.duration_ms,
        };
        cache.lastData = result;
        cache.lastDataAt = Date.now();
        return result;
      }
    } else {
      const errorText = await recentlyPlayedRes.text();
      console.warn(`[Spotify API] Recently played returned status ${recentlyPlayedRes.status}:`, errorText);
      return {
        isPlaying: false,
        isOffline: true,
        error: errorText,
        message: 'Could not fetch recently played track from Spotify',
      };
    }

    const fallback = {
      isPlaying: false,
      isOffline: true,
      message: 'No track currently playing or recently played',
    };
    cache.lastData = fallback;
    cache.lastDataAt = Date.now();
    return fallback;
  } catch (error) {
    return (
      cache.lastData || {
        isPlaying: false,
        isOffline: true,
        error: error.message || 'Unknown error occurred',
      }
    );
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=10');

  const data = await getSpotifyData();
  res.status(200).json(data);
}
