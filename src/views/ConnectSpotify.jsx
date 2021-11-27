import {APP_NAME} from '../constants';
import {Button} from 'react-bootstrap';
import {SPOTIFY_ACCOUNTS_API, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} from '../constants';
import {useLocation} from 'react-router-dom';
import crypto from 'crypto';
import pkceChallenge from 'pkce-challenge';
import axios from "axios";

const { code_verifier, code_challenge } = pkceChallenge(48);

const CODE_VERIFIER = 'correc-horse-battery-stapler-xkcd-ftw';
const CODE_CHALLENGE = crypto.createHash('sha256').update(CODE_VERIFIER).digest().toString();


const authParams = new URLSearchParams();
authParams.append('client_id', SPOTIFY_CLIENT_ID);
authParams.append('response_type', 'code');
authParams.append('scope', 'user-read-playback-state user-modify-playback-state user-read-currently-playing');
authParams.append('redirect_uri', SPOTIFY_REDIRECT_URI);
authParams.append('code_challenge_method', 'S256');
authParams.append('code_challenge', code_challenge);
console.log('using challenge ', code_challenge);

const AUTH_URL = `${SPOTIFY_ACCOUNTS_API}/authorize?${authParams.toString()}`;

export default function ConnectSpotify() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    if (error === 'access_denied') {
      return <h1>Oh.</h1>
    }
    return <>
      <h1>Yikes.</h1>
      <h6>Just walk away</h6>
    </>
  }

  if (code) {
    const ACCESS_TOKEN_URL = `${SPOTIFY_ACCOUNTS_API}/api/token`;
    const code_verifier = localStorage.getItem('codeVerifier_DO_NOT_SHARE');
    const params = new URLSearchParams();
    console.log('retrieved verification code ', code_verifier);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', SPOTIFY_REDIRECT_URI);
    params.append('client_id', SPOTIFY_CLIENT_ID);
    params.append('code_verifier', code_verifier);

    axios({
      method: 'post',
      url: ACCESS_TOKEN_URL,
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(console.log)
      .catch((e) => console.error(e.message))
    return <div>got a code {code}</div>
  }

  localStorage.setItem('codeVerifier_DO_NOT_SHARE', code_verifier);

  return <>
    <h1>Connect Your Spotify Account</h1>
    <p>Let {APP_NAME} control your music player on Spotify. Connect an account you plan on playing loud and
      proud.</p>
    <br/>
    <Button variant='outline-dark' href={AUTH_URL}>Authorize with Spotify</Button>
    <br/>
    <br/>
    <br/>
    <small>We don't modify any data, such as playlists or liked songs (or anything else)</small>
  </>
}
