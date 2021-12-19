import { createContext} from "react";

export const SpotifyPlayerContext = createContext({
  track: null,
  isPlaying: false,
  startFrom: 0,
  // when the objet is updated, this prop controls whether
  // spotify should be updated (start playing a song) or not
  // set to false when fetching already set data (Like on a page
  // refresh)
  updateSpotify: true,
});
