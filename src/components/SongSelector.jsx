import spotify from '../externalApis/spotify';
import {IoFlameSharp} from 'react-icons/io5';
import useUser from '../auth/identity'
import User from '../models/User';
import Quarry from '../models/Quarry';
import {MONEY_PLURAL} from '../constants';
import {FormControl, InputGroup, Button, Badge, ListGroup} from "react-bootstrap";
import {useState} from "react";
import {Time} from 'goodtimer';
import ConfirmSongSelection from "./ConfirmSongSelection";

export default function SongSelector({soupId, eventHandler = () => {}} = {}) {

  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [submittingSong, setSubmittingSong] = useState(false);
  const user = useUser();

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
        if (!res) {
          return;
        }
        setTracks(res.data.tracks.items)
      })
  }

  function handleSelected(selectedTrack) {
    setSelectedTrack(selectedTrack);
    setShowConfirm(true);
  }

  function handleConfirmation(isConfirmed) {
    setShowConfirm(false);
    if (isConfirmed && !submittingSong) {
      setSubmittingSong(true);

      User.findById(user)
        .then(userDoc => {
          if (userDoc.money < 1) {
            alert(`You're too broke! Wait a few minutes for your ${MONEY_PLURAL} to be replenished.`);
            throw Error('Silent');
          }
          const updatedMoney = userDoc.money - 1;
          return User.update({_id: user}, {money: updatedMoney})
            .then(user => {
              eventHandler('updateUser');
              eventHandler('selectedTrack', selectedTrack);
              return user;
            })
        })
        .then(() => Quarry.findById(soupId))
        .then(soup => {
          const updateQueue = [{votes: 5, track: selectedTrack}, ...soup.queue];
          eventHandler('updateQueue', updateQueue);
          return Quarry.update({_id: soup._id}, {queue: updateQueue})
        })
        .catch(e => {
          if (e.message.toLowerCase() === 'silent') {
            return e;
          }
          throw e;
        })
        .finally(() => {
          setSubmittingSong(false);
        })

      if (user.money < 1) {
        console.log('no money!');
        return;
      }
    }
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
