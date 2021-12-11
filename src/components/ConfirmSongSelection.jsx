import {Modal, Button, Badge} from "react-bootstrap";
import {FaTicketAlt} from 'react-icons/fa';
import {MONEY_SINGULAR} from '../constants'
import TrackPreview from "./TrackPreview";

export default function ConfirmSongSelection({show, track, handler}) {
  if (track === null) {
    return null;
  }
  return <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Nominating Song</Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you want to spend <b>1 {MONEY_SINGULAR}</b> to nominate this song?
      <br/>
      <TrackPreview track={track}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={() => handler(false)}>
        Close
      </Button>
      <Button variant="dark" onClick={() => handler(true)}>
        Submit&nbsp; <Badge bg='primary' pill>-1 <FaTicketAlt/></Badge>
      </Button>
    </Modal.Footer>
  </Modal>
}
