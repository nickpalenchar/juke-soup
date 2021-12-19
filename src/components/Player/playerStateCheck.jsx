import spotify from "../../externalApis/spotify";
import {TRACK_END} from "./Player";

let playerCheckId;

export const checkPlayerForTrackEnd = async (onEnd, trackUri) => {
  const playerState = await spotify.request('/me/player');
  const recentlyPlayed  = (await spotify.request('/me/player/recently-played', {
    params: {
      'limit': 1
    }
  }));
  const lastPlayed = recentlyPlayed.data.items[0]?.track?.uri;
  console.log('LAST PLAYED IS ', lastPlayed);
  if (!playerState.data.is_playing) {
    console.log('CALLITHG THE THE')
    clearInterval(playerCheckId);
    playerCheckId = null;
    onEnd();
    return;
  }
  console.log('STATE', playerState);
}

export const startPlayerCheckLoop = (onEnd) => {
  console.log('starting player check loop');
  if (playerCheckId) {
    return;
  }
  playerCheckId = setInterval(() => checkPlayerForTrackEnd(onEnd), 7200);
}
export const stopPlayerCheckLoop = () => {
  clearInterval(playerCheckId);
  playerCheckId = null;
}
