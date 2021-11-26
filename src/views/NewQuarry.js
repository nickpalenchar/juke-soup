import {Form} from 'react-bootstrap';
import { collection, addDoc } from "firebase/firestore";

import getDatabase from "../database/getDatabase";

export default function NewQuarry(props) {

  const db = getDatabase();
  console.log('hello/???', collection(db, "users"));
    const docRef = addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    }).then(console.log).catch(console.error);

    return (
        <>
            <h1>Open a Quarry. Discover Music.</h1>
            <Form>
                <Form.Group controlId='test'/>
            </Form>
        </>
    )
}
