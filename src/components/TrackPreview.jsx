import {Badge, Figure} from "react-bootstrap";


export default function TrackPreview({track}) {
  console.log('PREVIEW FOR TRACK', track);
  if (!track) {
    return null;
  }
  return <div className='d-flex'>
    <div style={{margin: '16px'}}>
        <img
            src={track.album.images[2].url}
          />
    </div>
    <div style={{margin: '16px'}}>
      <div className='fw-bold'>{track.name} {track.explicit && <Badge bg='secondary'>Explicit</Badge>}&nbsp;</div>
      <div>{track.artists.map(a => a.name).join(', ')}</div>
    </div>
  </div>
}
