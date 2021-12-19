import React from 'react';
import Loading from "../Loading";
import { SpotifyPlayerContext } from "../../contexts/SpotifyPlayerContext";
import TrackPreview from "../TrackPreview";
import spotify from "../../externalApis/spotify";
import Quarry from '../../models/Quarry';

import {
  checkPlayerForTrackEnd,
  startPlayerCheckLoop,
  } from './playerStateCheck';

export const TRACK_END = 'TRACK_END';
export const ERROR_PLAY_FAILED = 'ERROR_PLAY_FAILED';

async function playTrack(uri, {offsetMs = 0, currentUri } = {}) {
  const playerState = await spotify.request('/me/player');
  if (playerState.data.item.uri === uri) {
    console.log('song is already playing, not playing', playerState.data);
    return;
  }
  const res = await spotify.request('/me/player/play', {
    method: 'put',
    data: {
      uris: [uri]
    }
  });
  console.log('PLAYER::', res);
}

export default function Player({ eventHandler, soupId }) {

  if (!soupId) {
    return <Loading />;
  }

  const updateConnectedSoup = async (updateObj) =>
    Quarry.update({_id: soupId}, updateObj);


  const onValueChange = (values) => {
    if (values === null) {
      return <div>Talking to Spotify..</div>
    }

    const { isPlaying, track, startFrom, updateSpotify } = values;
    console.log('VALUE CHANGE ', {isPlaying, track});

    if (isPlaying) {
      if (track) {
        playTrack(track.uri)
          .catch(e => {
            eventHandler(ERROR_PLAY_FAILED, e);
          })
          .then(() => {
            startPlayerCheckLoop(() => eventHandler(TRACK_END));
            setTimeout(() =>
              checkPlayerForTrackEnd(() => eventHandler(TRACK_END)), track.duration_ms - 800);
            return updateConnectedSoup({
              isPlaying: true,
              duration: track.duration_ms,
              startedAt: new Date()
            });
          });
        return <TrackPreview track={track} />
      }
      eventHandler(TRACK_END);
      return <div>Getting next song...</div>
    }
    // todo PAUSE
    return <div>paused</div>
  }

  return <SpotifyPlayerContext.Consumer>
    {onValueChange}
  </SpotifyPlayerContext.Consumer>
}
