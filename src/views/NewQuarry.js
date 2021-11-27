import {Form} from 'react-bootstrap';
import {collection, addDoc} from "firebase/firestore";
import User from '../models/User';


import getDatabase from "../database/getDatabase";

export default function NewQuarry(props) {

  User.findOne({
    first: 'Ada',
    born: 2053
  }).then(console.log);

  return (
    <>
      <h1>Open a Quarry. Discover Music.</h1>
      <Form>
        <Form.Group controlId='test'/>
      </Form>
    </>
  )
}
