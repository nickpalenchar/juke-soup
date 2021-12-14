import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FaMusic, FaTicketAlt} from 'react-icons/fa'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import find from 'lodash.find';
import sortBy from 'lodash.sortby';
import { startMoneyLoop, stopMoneyLoop } from '../routines/moneyReplenish';
import Loading from "../components/Loading";
import QuarryModel from '../models/Quarry';
import {MobilishView} from "../components/MobilishView";
import SongQueue from "../components/SongQueue";
import {Accordion, Card, Tabs, Tab} from "react-bootstrap";
import QuarrySharing from "../components/QuarrySharing";
import SongSelector from "../components/SongSelector";
import User from "../models/User";
import useUser from "../auth/identity";

export default function Quarry() {
  const {id: quarryId} = useParams();

  const [quarry, setQuarry] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const myId = useUser();

  useEffect(() => {
    if (quarry !== null) {
      return;
    }

    User.findById(myId)
      .then(setUser);

    QuarryModel.findById(quarryId)
      .then(quarry => {
        if (!quarry) {
          console.log('setting error');
          return setErrorCode(404);
        }
        setQuarry(quarry);
        startMoneyLoop();
      });

    return stopMoneyLoop;
  });

  const songSelectorEvent = (event, data) => {
    if (event === 'updateUser') {
      User.findById(myId)
        .then(setUser);
    } else if (event === 'selectedTrack') {
      console.log('adding track', data);
    } else if (['up', 'down'].includes(event)) {
      setUpdating(true)
      const songToUpdate = find(quarry.queue, (o) => o.track.id === data.track.id);
      console.log('found in queue ', songToUpdate);
      songToUpdate.votes += event === 'up' ? 1 : -1;
      quarry.queue = sortBy(quarry.queue, 'votes').reverse();
      QuarryModel.update({_id: quarry._id}, {queue: quarry.queue})
        .then(() => setQuarry(quarry))
        .finally(() => setUpdating(false));
    } else if (event === 'down') {

    }
  }

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
  return <MobilishView align='left'>
    <section>
      <h2>{quarry.name} </h2><h4>{ typeof user?.money === 'number' ? userMoneyStat : ' '}</h4>
    </section>
    <QuarrySharing phrase={quarry.phrase}/>
    <br/>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="songs" title={<><FaMusic/> Songs</>}>
        <SongQueue songs={quarry.queue} onVote={songSelectorEvent}/>
      </Tab>
      <Tab eventKey="new" title={<><AiOutlinePlusCircle/> New </>}>
        <SongSelector eventHandler={songSelectorEvent} soupId={quarryId}/>
      </Tab>
    </Tabs>
  </MobilishView>
}
