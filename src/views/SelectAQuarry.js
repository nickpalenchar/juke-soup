import {useNavigate} from "react-router-dom";
import {CgBowl} from "react-icons/cg";
import useUser from "../auth/identity";
import Loading from "../components/Loading";
import {MobilishView} from "../components/MobilishView";
import {Button, FormControl, InputGroup} from "react-bootstrap";

function SelectAQuarry(props) {
  const navigate = useNavigate();
  const user = useUser();
  if (user === null) {
    return <Loading/>
  }
  return (
    <MobilishView>
      <br/>
      <br/>
      <h1><CgBowl/> Find a Soup</h1>
      <hr/>
      <br/>
      <InputGroup>
        <InputGroup.Text>2-word phrase:</InputGroup.Text>
        <FormControl
          placeholder='(e.g. "shining pearl")'
        />
        <Button variant='outline-primary'>Find</Button>
      </InputGroup>
      {/*<input type="text"*/}
      {/*       className='input-center'*/}
      {/*       placeholder='two words (e.g. "shining-pearl")'/> | <button>Enter</button>*/}
      <br/>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'column'
      }}>
        <div
          style={{
            color: '#888',
            textAlign: 'center',
            padding: '16px'
          }}>or
        </div>
        <Button
          style={{width: '100%'}}
          variant='success'
          onClick={() => navigate('/soup/new')}>Create one</Button>
      </div>

    </MobilishView>
  );
}

export default SelectAQuarry
