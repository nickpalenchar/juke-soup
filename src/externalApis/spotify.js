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

const spotifyAuthedAxios = axios.create()

let instance = axios.create()

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
      console.error(e);
    }
    return res;
  }
}

const spotify = new AxiosWithSpotifyAuth();

export default spotify;
