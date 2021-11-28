import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FaMusic} from 'react-icons/fa'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Loading from "../components/Loading";
import QuarryModel from '../models/Quarry';
import {MobilishView} from "../components/MobilishView";
import SongQueue from "../components/SongQueue";
import {Accordion, Card, Tabs, Tab} from "react-bootstrap";
import {BASE_URI} from '../constants'
import QuarrySharing from "../components/QuarrySharing";
import SongSelector from "../components/SongSelector";

export default function Quarry() {
  const {id: quarryId} = useParams();

  const [quarry, setQuarry] = useState(null);
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    QuarryModel.findById(quarryId)
      .then(quarry => {
        if (!quarry) {
          console.log('setting error')
          return setErrorCode(404);
        }
        setQuarry(quarry);
      });

  });

  if (errorCode) {
    console.log(errorCode);
    if (errorCode === 404) {
      return (<MobilishView>
        <h1>Quarry not found <code>404</code></h1>
        <p>It might have been deleted. Or we might've screwed up (probs not tbh)</p>
        <p><a href='/'>Back to the fam</a></p>
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
  return <MobilishView align='left'>
    <section>
      <h2>{quarry.name}</h2>
    </section>
    <QuarrySharing phrase={quarry.phrase}/>
    <br/>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="songs" title={<><FaMusic/> Songs</>}>
        <SongQueue songs={quarry.queue}/>
      </Tab>
      <Tab eventKey="new" title={<><AiOutlinePlusCircle/> New </>}>
        <SongSelector/>
      </Tab>
    </Tabs>
  </MobilishView>
}
