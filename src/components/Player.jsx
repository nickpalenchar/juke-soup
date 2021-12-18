import React from 'react';
import { SpotifyPlayerContext } from "../contexts/SpotifyPlayerContext";
import TrackPreview from "./TrackPreview";


export default function Player({ eventHandler }) {

  const onValueChange = ({ isPlaying, track, startFrom }) => {
    console.log('VALUE CHANGE ', {isPlaying, track});
    if (isPlaying) {
      if (!track) {
        eventHandler('TRACK_END');
        return <div>Getting next song...</div>
      }
      return <TrackPreview track={track} />
    }
    return <div>todo</div>
  }

  return <SpotifyPlayerContext.Consumer>
    {onValueChange}
  </SpotifyPlayerContext.Consumer>
}
