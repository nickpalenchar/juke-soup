import { createContext} from "react";

export const SpotifyPlayerContext = createContext({
  track: null,
  isPlaying: false,
  startFrom: 0
});
