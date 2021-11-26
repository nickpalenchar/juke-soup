import '../style/input.css';
import '../style/button.css'
import {useNavigate} from "react-router-dom";

function SelectAQuarry(props) {
    const navigate = useNavigate();

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