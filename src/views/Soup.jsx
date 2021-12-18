import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FaMusic, FaTicketAlt, FaPlay} from 'react-icons/fa'
import {useState, useEffect} from 'react';
import {SpotifyPlayerContext} from "../contexts/SpotifyPlayerContext";
import {useParams} from 'react-router-dom';
import find from 'lodash.find';
import sortBy from 'lodash.sortby';
import {startMoneyLoop, stopMoneyLoop} from '../routines/moneyReplenish';
import Loading from "../components/Loading";
import QuarryModel from '../models/Quarry';
import {MobilishView} from "../components/MobilishView";
import SongQueue from "../components/SongQueue";
import {Tabs, Tab, Button} from "react-bootstrap";
import QuarrySharing from "../components/QuarrySharing";
import SongSelector from "../components/SongSelector";
import Player from "../components/Player";
import User from "../models/User";
import useUser from "../auth/identity";

import './Soup.css';

export default function Soup() {
  const {id: quarryId} = useParams();

  const [quarry, setQuarry] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [playerValues, setPlayerValues] = useState({track: null, isPlaying: false, startAt: 0})
  const [playerLock, setPlayerLock] = useState(false);
  const myId = useUser();

  useEffect(() => {
    if (quarry !== null) {
      return;
    }

    User.findById(myId)
      .then((user) => setUser(user, [quarry, myId, quarryId]));

    QuarryModel.findById(quarryId)
      .then(soup => {
        if (!soup) {
          console.log('setting error');
          return setErrorCode(404);
        }
        setQuarry(soup);
        startMoneyLoop();
      });

    return stopMoneyLoop;
  });

  const songSelectorEvent = (event, data) => {
    if (updating) {
      return;
    }
    if (event === 'updateUser') {
      User.findById(myId)
        .then((user) => setUser(user, [quarry, myId, quarryId]));
    } else if (event === 'selectedTrack') {
      console.log('adding track', data);
    } else if (['up', 'down'].includes(event)) {
      setUpdating(true);
      const songToUpdate = find(quarry.queue, (o) => o.track.id === data.track.id);
      console.log('found in queue ', songToUpdate);
      songToUpdate.votes += event === 'up' ? 1 : -1;
      quarry.queue = sortBy(quarry.queue, 'votes').reverse();
      QuarryModel.update({_id: quarry._id}, {queue: quarry.queue})
        .then(() => setQuarry(quarry))
        .finally(() => setUpdating(false));
    }
  }

  const handlePlayPauseButton = () => {
    setPlayerValues({...playerValues, isPlaying: !playerValues.isPlaying});
  }

  const onPlayerEvent = (event) => {
    console.log('# player event #');

    if (event === 'TRACK_END') {
      if (playerLock) {
        return;
      }
      setPlayerLock(true);
      const nextTrack = quarry.queue.pop()?.track;
      console.log('next track is ', nextTrack);
      if (!nextTrack) {
        // TODO message display
        console.info('no next track, pausing');
        setPlayerLock(false);
        return;
      }
      QuarryModel.update({ _id: quarry._id }, {queue: quarry.queue})
        .then(() => setQuarry(quarry))
        .then(() => {
          setPlayerValues({...playerValues, track: nextTrack, startAt: 0});
        })
        .catch((e) => {
          alert(e);
          setPlayerValues({...playerValues, isPlaying: false});
        })
        .finally(() => setPlayerLock(false));
    }
  };

  if (errorCode) {
    console.log(errorCode);
    if (errorCode === 404) {
      return (<MobilishView>
        <h1>Quarry not found <code>404</code></h1>
        <p>It might have been deleted. Or we might've screwed up (probs not tbh)</p>
        <p><a href='/'>Back to the pantry</a></p>
      </MobilishView>);
    }
    return (<MobilishView>
      <h1>Uh oh</h1>
      <p>Don't look at me.</p>
      <p><a href='/'>Just go away</a></p>
    </MobilishView>)
  }
  if (quarry === null) {
    return <Loading/>
  }
  const userMoneyStat = <><FaTicketAlt/> {user?.money}</>;
  return <SpotifyPlayerContext.Provider value={playerValues}>
    <MobilishView align='left'>
      <section>
        <span className='header'>
          <h2>{quarry.name} </h2>
          <Button variant='success' onClick={handlePlayPauseButton}><FaPlay/></Button>
        </span>
        <h4>{typeof user?.money === 'number' ? userMoneyStat : ' '}</h4>
      </section>
      <QuarrySharing phrase={quarry.phrase}/>
      <br/>
      <Player eventHandler={onPlayerEvent}/>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="songs" title={<><FaMusic/> Songs</>}>
          <SongQueue songs={quarry.queue} onVote={songSelectorEvent}/>
        </Tab>
        <Tab eventKey="new" title={<><AiOutlinePlusCircle/> New </>}>
          <SongSelector eventHandler={songSelectorEvent} soupId={quarryId}/>
        </Tab>
      </Tabs>
    </MobilishView>
  </SpotifyPlayerContext.Provider>
}
