import '../style/input.css';
import '../style/button.css'
import { useNavigate } from "react-router-dom";

import useUser from "../auth/identity";
import Loading from "../components/Loading";

function SelectAQuarry(props) {
    const navigate = useNavigate();
    const user = useUser();
    if (user === null) {
      return <Loading/>
    }
    return (
        <>
            <h1>Find a Quarry</h1>
            <input type="text"
                   className='input-center'
                   placeholder='two words (e.g. "shining-pearl")'/> | <button>Enter</button>
            <br/>
            <hr/>
            <h3>or <button onClick={() => navigate('/quarry/new')}>create one</button></h3>
        </>
    );
}

export default SelectAQuarry
