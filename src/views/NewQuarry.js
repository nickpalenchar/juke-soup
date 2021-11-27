import { useState } from 'react';
import {Form, InputGroup, Button, FormControl} from 'react-bootstrap';
import { FiRefreshCw } from 'react-icons/fi'
import Loading from "../components/Loading";
import useUser from '../auth/identity';
import {MobilishView} from "../components/MobilishView";
import twoWordPhrase from '../util/searchPhrase';



export default function NewQuarry(props) {

  const user = useUser();

  const [phrase, setPhrase] = useState(twoWordPhrase());
  const [validated, setValidated] = useState(false);
  const [quarryName, setQuarryName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateQuarryName = (event) => {
    setQuarryName(event.target.value);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form)
    console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidated(true);

    // TODO this should be handled with form validation
    if (!quarryName) {
      return;
    }
    setSubmitting(true);
  }

  if (user === null) {
    return <Loading/>
  }

  return (
    <MobilishView>
      <h1>Open a Quarry. Discover Music.</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} action=''>
        <Form.Group controlId='name'>
          <Form.Label>Quarry Name</Form.Label>
          <Form.Control required type="input" placeholder="(e.g. Nick's Place)" value={quarryName} onChange={updateQuarryName}/>
        </Form.Group>
        <br/>
        <InputGroup style={{width: '480px'}}>
          <InputGroup.Text>Your 2-word phrase:</InputGroup.Text>
          <FormControl
            style={{textAlign: 'center', fontFamily: 'monospace', color: 'red'}}
            readOnly
            value={phrase[0]}
            aria-label="Recipient's username with two button addons"
          />
          <FormControl
            style={{textAlign: 'center', fontFamily: 'monospace', color: 'red'}}
            readOnly
            value={phrase[1]}
            aria-label="Recipient's username with two button addons"
          />
          <Button variant="outline-secondary" onClick={() => setPhrase(twoWordPhrase())}><FiRefreshCw/></Button>
        </InputGroup>
        <Form.Text className="text-muted">This is helps friends find you.</Form.Text>
        <br/>
        <Button className={submitting ? 'btn-secondary' : 'btn-success'}
                type=''
                onClick={handleSubmit}
                disabled={submitting}> {!submitting ? 'Create' : 'working 💦'}</Button>
      </Form>
    </MobilishView>
  )
}
