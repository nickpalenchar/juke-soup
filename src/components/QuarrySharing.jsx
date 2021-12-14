import {Accordion} from "react-bootstrap";
import {BASE_URI} from "../constants";


export default function QuarrySharing(props) {
  const { phrase } = props;

  return (<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Bring your friends here 🙋‍♀️</Accordion.Header>
      <Accordion.Body>
        Tell them to enter <code>"{phrase.replace('-', ' ')}" </code>
        on {BASE_URI}. They can also go to <a href={`${BASE_URI}/${phrase}`}>{`${BASE_URI}/${phrase}`}</a> directly.
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>);
}
