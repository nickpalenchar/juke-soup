import {Form} from 'react-bootstrap';
import {collection, addDoc} from "firebase/firestore";
import User from '../models/User';
import Loading from "../components/Loading";
import useUser from '../auth/identity';



export default function NewQuarry(props) {

  const user = useUser();

  if (user === null) {
    return <Loading/>
  }

  return (
    <>
      <h1>Open a Quarry. Discover Music.</h1>
      <Form>
        <Form.Group controlId='test'/>
      </Form>
    </>
  )
}
