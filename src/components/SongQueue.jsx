import {Card} from "react-bootstrap";
import {FiMusic} from 'react-icons/fi';
import SongQueueListItem from './SongQueueListItem';

export default function SongQueue (props) {
  const { songs, onVote } = props;

  if (!songs) {
    throw Error('SongQueue component must have props `songs`');
  }

  const onVoteHandler = (...args) => onVote(...args);

  if (!songs.length) {
    return <>
      <Card>
        <Card.Title><FiMusic/> No songs added yet</Card.Title>
      </Card>
    </>
  }
  return <>
    <Card>
      <Card.Text>
        {songs.map((s, key) => <SongQueueListItem key={key} votes={s.votes} track={s.track} onVote={onVoteHandler}/>)}
      </Card.Text>
    </Card>
  </>
}
