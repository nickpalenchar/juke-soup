import React from 'react';
import Loading from "../Loading";
import { SpotifyPlayerContext } from "../../contexts/SpotifyPlayerContext";
import TrackPreview from "../TrackPreview";
import spotify from "../../externalApis/spotify";
import Quarry from '../../models/Quarry';

import {
  checkPlayerForTrackEnd,
  startPlayerCheckLoop,
  getLastTrackPlayed,
  stopPlayerCheckLoop
} from './playerStateCheck';

export const TRACK_END = 'TRACK_END';
export const ERROR_PLAY_FAILED = 'ERROR_PLAY_FAILED';
// Device id is used by spotify to play a song on
// if one has not yet been selected or is invalide (due to a removed device)
// the user will need to select a new one
export const NEED_DEVICE_ID = 'NEED_DEVICE_ID';


async function _requestSpotifyPlayTrack(uri) {
  try {
    console.log('tringi requestt')
    const res = await spotify.request('/me/player/play', {
      method: 'put',
      data: {
        uris: [uri]
      }
    })
    if (res.status === 404) {
      return { playerError: NEED_DEVICE_ID };
    }
    return res;
  } catch (e) {

  }

}

/** If this throws an error with an `event` property, it should be
 * emitted to eventHandler within the component.
 */
async function playTrack(uri, { offsetMs = 0, currentUri } = {}) {
  console.group('playTrack');
  const playerState = await spotify.request('/me/player');
  if (playerState.status === 204) {
    const lastTrack = await getLastTrackPlayed();
    if (lastTrack.uri !== uri) {
      console.log('▶️ Playing current track as its not the last track played already');
      return _requestSpotifyPlayTrack(uri);
    }
  }
  if (playerState.data.item.uri === uri) {
    console.log('song is playing right now, will not re-play', playerState.data);
    console.groupEnd();
    return;
  }
  console.log('🌐 Making request to Spotify to play track');
  const res = await _requestSpotifyPlayTrack(uri);
  console.log('🎵🎵 Response from play request', res);
  console.groupEnd();
}

export default function Player({ eventHandler, soupId, deviceId }) {

  if (!soupId) {
    return <Loading />;
  }

  const updateConnectedSoup = async (updateObj) =>
    Quarry.update({ _id: soupId }, updateObj);


  const onValueChange = (values) => {
    if (values === null) {
      return <div>Talking to Spotify..</div>
    }
    console.group('Player:onValueChange');

    const { isPlaying, track, startFrom, updateSpotify } = values;
    console.log('new values', { isPlaying, track, startFrom, updateSpotify });

    if (isPlaying) {
      if (track) {
        console.log('sending to playTrack with uri ', track.uri);
        playTrack(track.uri)
          .then((res) => {
            if (res?.playerError) {
              return eventHandler(res.playerError);
            }
            startPlayerCheckLoop(() => eventHandler(TRACK_END));
            setTimeout(() =>
              checkPlayerForTrackEnd(() => eventHandler(TRACK_END)), track.duration_ms - 800);
            return updateConnectedSoup({
              isPlaying: true,
              duration: track.duration_ms,
              startedAt: new Date()
            });
          })
          .catch(e => {
            eventHandler(ERROR_PLAY_FAILED, e);
          })
        console.groupEnd();
        return <TrackPreview track={track} />
      }
      console.log('there is no track, so send TRACK_END event');
      console.groupEnd();
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
