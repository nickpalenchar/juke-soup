import axios from 'axios';
import {SPOTIFY_ACCOUNTS_API, SPOTIFY_API, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} from '../constants';

const ACCESS_TOKEN = 'spotifyAccessToken_DO_NOT_SHARE';
const REFRESH_TOKEN = 'spotifyRefreshToken';

class Storage {
  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  set accessToken(val) {
    localStorage.setItem(ACCESS_TOKEN, val);
  }
  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }
  set refreshToken(val) {
    localStorage.setItem(REFRESH_TOKEN, val);
  }
}

const storage = new Storage();

class AxiosWithSpotifyAuth {
  constructor() {
    this.axios = this._createAxiosWithSpotifyAuth();
  }
  _createAxiosWithSpotifyAuth() {
    return axios.create({
      baseURL: SPOTIFY_API,
      headers: {
        'Authorization': `Bearer ${storage.accessToken}`
      }
    })
  }
  setAccessToken(accessToken) {
    storage.accessToken = accessToken;
    this.axios = this._createAxiosWithSpotifyAuth();
  }
  setRefreshToken(refreshToken) {
    storage.refreshToken = refreshToken;
    this.axios = this._createAxiosWithSpotifyAuth();
  }

  async setTokensWithCode(code, codeVerifier) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', SPOTIFY_REDIRECT_URI);
    params.append('client_id', SPOTIFY_CLIENT_ID);
    params.append('code_verifier', codeVerifier);
    const ACCESS_TOKEN_URL = `${SPOTIFY_ACCOUNTS_API}/api/token`;
    const res = await axios({
      url: ACCESS_TOKEN_URL,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    this.setAccessToken(res.data.access_token);
    this.setRefreshToken(res.data.refresh_token);
    return res;
  }

  async request(...args) {
    let res;
    try {
      res = await this.axios(...args);
    } catch (e) {
      if (e.response?.data.error.message === "The access token expired") {
        console.log('access token expired, trying new token');
        await this.requestAccessTokenFromRefreshToken();
        return this.request(...args);
      }
      return e.response;
    }
    return res;
  }

  async requestAccessTokenFromRefreshToken() {
    console.log('starting refresh flow')
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: storage.refreshToken,
      client_id: SPOTIFY_CLIENT_ID,
    });
    try {
      const res = await axios({
        url: `${SPOTIFY_ACCOUNTS_API}/api/token`,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
      });
      storage.accessToken = res.data.access_token;
      storage.refreshToken = res.data.refresh_token;
      return res;
    } catch(e) {
      if (e.message === 'Request failed with status code 400' || /The access token expired/.test(e.message)) {
        alert('Please reconnect Spotify');
        window.location.href = '/spotifyConnect';
      } else {
        console.error('HANDLE THIS IN spotify.js');
        console.log(e);
        throw e;
      }
    }
  }

  // async getAvailableD
}

const spotify = new AxiosWithSpotifyAuth();

export default spotify;
