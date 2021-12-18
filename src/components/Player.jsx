import React from 'react';
import { SpotifyPlayerContext} from "../contexts/SpotifyPlayerContext";

export default function Player() {
  return <SpotifyPlayerContext.Consumer>
    {value => <div>The default value is {value}</div>}
  </SpotifyPlayerContext.Consumer>
}
