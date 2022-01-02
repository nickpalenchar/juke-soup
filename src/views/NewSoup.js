import {useState} from 'react';
import {Form, InputGroup, Button, FormControl, Container, Row, Col} from 'react-bootstrap';
import {FiRefreshCw} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom';
import Loading from "../components/Loading";
import useUser from '../auth/identity';
import {MobilishView} from "../components/MobilishView";
import twoWordPhrase from '../util/searchPhrase';
import Quarry from "../models/Quarry";

export default function NewSoup(props) {

  const navigate = useNavigate();
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

    // TODO probably re-validate user exists before creating
    Quarry.create({
      leader: user._id,
      _authIds: [user.authId],
      phrase: phrase.join('-'),
      name: quarryName
    })
      .then(data => {
        console.log('new quarry', data);
        navigate(`/soup/${data._id}`);
      })
  }

  if (user === null) {
    return <Loading/>
  }

  return (
    <MobilishView>
      <Container fluid>
        <Row md='auto' className='justify-content-center'>
          <Col sm style={{padding: '0 4px 0 0'}}><h1>Start a soup,</h1></Col><Col sm style={{padding: '0'}}><h1>discover music.</h1></Col>
        </Row>
        <Row>
          <hr/>
        </Row>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit} action=''>
            <Form.Group controlId='name'>
              <Form.Label>Soup Name</Form.Label>
              <Form.Control required type="input" placeholder="(e.g. Nick's Soup)" value={quarryName}
                            onChange={updateQuarryName}/>
            </Form.Group>
            <br/>
            <div className='d-md-none' style={{textAlign: 'center'}}>Your phrase:</div>
            <InputGroup style={{maxWidth: '480px'}}>
              <InputGroup.Text
                className='d-none d-md-inline'
              >
                Your phrase:
              </InputGroup.Text>
              <FormControl
                style={{textAlign: 'center', fontFamily: 'monospace', color: 'red'}}
                readOnly
                value={phrase[0]}
                aria-label="First word of phrase"
              />
              <FormControl
                style={{textAlign: 'center', fontFamily: 'monospace', color: 'red'}}
                readOnly
                value={phrase[1]}
                aria-label="Second word of phrase"
              />
              <Button
                className='d-none d-md-inline'
                variant="outline-secondary"
                onClick={() => setPhrase(twoWordPhrase())}
              >
                <FiRefreshCw/>
              </Button>
            </InputGroup>
            <Button
              className='d-md-none'
              style={{width: '100%'}}
              variant="outline-secondary"
              onClick={() => setPhrase(twoWordPhrase())}
            >
              <FiRefreshCw/>
            </Button>

            <Form.Text className="text-muted">This is helps friends find you.</Form.Text>
            <br/>
            <br/>
            <Button className={(submitting ? 'btn-secondary' : 'btn-success')}
                    style={{width: '100%'}}
                    type=''
                    onClick={handleSubmit}
                    disabled={submitting}> {!submitting ? 'Create' : 'working 💦'}</Button>
          </Form>
        </Row>
      </Container>
    </MobilishView>
  )
}
