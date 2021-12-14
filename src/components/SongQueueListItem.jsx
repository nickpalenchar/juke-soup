import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import TrackPreview from "./TrackPreview";
import '../style/songListQueueItem.css'


export default function SongQueueListItem ({ votes, track, onVote }) {

  return <div className='container'>
    <div className='voteWindow'>
      <div className='clickable' onClick={() => onVote('up', {track})}><AiOutlineUp/></div>
      <div><h3>{votes}</h3></div>
      <div className='clickable' onClick={() => onVote('down', {track})}><AiOutlineDown/></div>
    </div>
    <div>
      <TrackPreview track={track}/>
    </div>
  </div>

}
