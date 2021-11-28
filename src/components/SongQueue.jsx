import {Card} from "react-bootstrap";
import {FiMusic} from 'react-icons/fi'

export default function SongQueue (props) {
  const { songs } = props;
  if (!songs) {
    throw Error('SongQueue component must have props `songs`');
  }

  if (!songs.length) {
    return <>
      <Card>
        <Card.Title><FiMusic/> No songs added yet</Card.Title>
      </Card>
    </>
  }
}
