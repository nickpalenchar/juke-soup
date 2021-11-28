import spotify from '../externalApis/spotify';
import { render } from 'react-dom';
import {IoFlameSharp} from 'react-icons/io5';
import {FormControl, InputGroup, Button, Badge, ListGroup} from "react-bootstrap";
import FormContext from "react-bootstrap/FormContext";
import {useState} from "react";
import {Time} from 'goodtimer';
import ConfirmSongSelection from "./ConfirmSongSelection";


export default function SongSelector() {

  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  function doSearch() {
    spotify.request('/search', {
      params: {
        q: query,
        type: 'track',
        limit: 6
      }
    })
      .then(res => {
        console.log(res);
        setTracks(res.data.tracks.items)
      })
  }

  function handleSelected(selectedTrack) {
    setSelectedTrack(selectedTrack);
    setShowConfirm(true);
  }

  function handleConfirmation(isConfirmed) {
    setShowConfirm(false);
    console.log('was it ture?? ', isConfirmed);

  }

  function renderTrack(track, key) {
    const time = new Time(track.duration_ms);
    // TODO TrackPreview.jsx should have a variant that renders this
    return <ListGroup.Item
      className="d-flex justify-content-between align-items-start"
      key={key}
      action
      onClick={() => handleSelected(track)}
    >
      <div>
        <div className="fw-bold">{track.name}&nbsp;
          {track.explicit && <Badge bg='secondary'>Explicit</Badge>}&nbsp;
          {track.popularity > 75 && <IoFlameSharp size='1.3em' style={{color: '#ff8c00'}}/>}
          {track.popularity > 83 && <IoFlameSharp size='1.3em' style={{color: '#ff8c00'}}/>}
          {track.popularity > 92 && <IoFlameSharp size='1.3em' style={{color: '#ff8c00'}}/>}
        </div>
        <div>{track.artists.map(a => a.name).join(', ')}</div>
      </div>
      <div style={{fontFamily: 'monospace'}}>{time.toString('s')}</div>
    </ListGroup.Item>
  }

  return <>
    <InputGroup>
      <FormControl
        placeholder="Type to search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </InputGroup>
    <Button onClick={doSearch}>Search</Button>
    <br/>
    <ListGroup>
      {tracks.map(renderTrack)}
    </ListGroup>
    <ConfirmSongSelection show={showConfirm} track={selectedTrack} handler={handleConfirmation}/>
  </>
}
