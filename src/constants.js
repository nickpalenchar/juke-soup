
const constants =  {
  APP_NAME: 'JukeSoup',
  BASE_URI: process.env.REACT_APP_BASE_URI || 'http://localhost:3000',
  SPOTIFY_API: 'https://api.spotify.com/v1',
  SPOTIFY_ACCOUNTS_API: 'https://accounts.spotify.com',
  SPOTIFY_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  MONEY_SINGULAR: 'ticket',
  MONEY_PLURAL: 'tickets',
  MAX_MONEY: 20
}
constants.SPOTIFY_REDIRECT_URI = `${constants.BASE_URI}/callback`;

module.exports = constants;
