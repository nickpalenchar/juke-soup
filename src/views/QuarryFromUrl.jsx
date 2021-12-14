import Loading from "../components/Loading";
import Quarry from "../models/Quarry";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const { useParams } = require('react-router-dom');

export default function QuarryFromUrl() {
  const { phrase } = useParams();
  const navigate = useNavigate();
  if (!/^\w{1,10}-\w{1,10}$/.test(phrase)) {
    navigate('/');
  }
  const [ quarry, setQuarry ] = useState(null);
  console.log('its ', phrase);

  Quarry.find({phrase})
    .then(quarry => {
      if (quarry?.length === 1) {
        navigate(`/quarry/${quarry[0]._id}`);
      } else if (quarry?.length > 1 ) {
        console.log('todo') // todo
        setQuarry(quarry);
      } else {
        navigate('/');
      }
    })

  if (quarry === null) {
    return <Loading/>;
  }

  return <div>This is a list of soups (TODO)</div>

}
