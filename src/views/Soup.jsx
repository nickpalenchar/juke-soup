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
import {Tabs, Tab, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
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
  const [playerValues, setPlayerValues] = useState(null);
  const [playerLock, setPlayerLock] = useState(false);
  const [selectedTab, setSelectedTab] = useState('songs')
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
        setPlayerValues({
          isPlaying: soup.isPlaying,
          track: soup.currentTrack,
          updateSpotify: true
        });
        if (!soup.queue.length) {
          setSelectedTab('new');
        }
        startMoneyLoop();
      });

    return stopMoneyLoop;
  });

  const sortQueue = (queue) => sortBy(quarry.queue, 'votes').reverse();

  const songSelectorEvent = (event, data) => {
    if (updating) {
      return;
    }
    if (event === 'updateUser') {
      User.findById(myId)
        .then((user) => setUser(user, [quarry, myId, quarryId]));
    } else if (event === 'updateQueue') {
      console.log('updating main queue data', data);
      setQuarry({...quarry, ...{queue: data}});
      setSelectedTab('songs');
    } else if (['up', 'down'].includes(event)) {
      setUpdating(true);
      const songToUpdate = find(quarry.queue, (o) => o.track.id === data.track.id);
      songToUpdate.votes += event === 'up' ? 1 : -1;
      quarry.queue = sortQueue(quarry.queue);
      QuarryModel.update({_id: quarry._id}, {queue: quarry.queue})
        .then(() => setQuarry(quarry))
        .finally(() => setUpdating(false));
    }
  }

  const handlePlayPauseButton = () => {
    const isPlaying = !playerValues.isPlaying;
    setPlayerValues({...playerValues, isPlaying, updateSpotify: true});
    QuarryModel.update({_id: quarry._id}, {isPlaying})
      .catch(console.error);
  }

  const onPlayerEvent = (event) => {
    console.log('# player event #');

    if (event === 'TRACK_END') {
      if (playerLock) {
        console.info('player locked');
        return;
      }
      setPlayerLock(true);
      console.group('onPlayerEvent:TRACK_END')
      console.log('getting next track');
      const nextTrack = quarry.queue.pop()?.track;
      console.log('next track is ', nextTrack);
      if (!nextTrack) {
        // TODO message display
        console.info('no next track, pausing');
        setPlayerValues({...playerValues, isPlaying: false, updateSpotify: true});
        setPlayerLock(false);
        QuarryModel.update({_id: quarry._id}, {isPlaying: false})
          .catch(console.error);
        console.groupEnd();
        return;
      }
      console.log('SOUP; updating with next track', nextTrack);
      QuarryModel.update({_id: quarry._id}, {
        queue: quarry.queue,
        currentTrack: nextTrack,
        startedAt: new Date(),
        isPlaying: playerValues.isPlaying
      })
        .then(() => setQuarry(quarry))
        .then(() => {
          console.log('setting player values');
          setPlayerValues({...playerValues, track: nextTrack, startAt: 0});
        })
        .catch((e) => {
          alert(e);
          setPlayerValues({...playerValues, isPlaying: false});
        })
        .finally(() => {
          console.groupEnd();
          setPlayerLock(false);
        })
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

  const startButtonDisabled = !quarry.queue.length && !quarry.currentTrack;

  return <SpotifyPlayerContext.Provider value={playerValues}>
    <MobilishView align='left'>
      <section>
        <span className='header'>
          <h2>{quarry.name} </h2>
          <OverlayTrigger
            placement='bottom'
            delay={150}
            overlay={(props) => <Tooltip {...props} >Add a song first</Tooltip>}
          >
            <Button variant='success' disabled={startButtonDisabled} onClick={handlePlayPauseButton}><FaPlay/></Button>
          </OverlayTrigger>
        </span>
        <h4>{typeof user?.money === 'number' ? userMoneyStat : ' '}</h4>
      </section>
      <QuarrySharing phrase={quarry.phrase}/>
      <br/>
      <Player eventHandler={onPlayerEvent} soupId={quarry?._id}/>
      <Tabs activeKey={selectedTab} onSelect={setSelectedTab} className="mb-3">
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
