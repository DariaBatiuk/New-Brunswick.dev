
import { useState, useEffect } from "react";
const HandleArray = (props) => {


    const [arrData, setArrData] = useState([]);
    const [newValue, setNewValue] = useState(false);
    const [inputValue , setInputValue] = useState("");

    useEffect(() => {
        setArrData(props.dataArray);
    }, [props.dataArray]);

    function addArr() {
        const newArr = [...arrData, inputValue];
        props.updateParentState(props.fieldName, newArr);
        setNewValue(false);
    }


    function deleteArr(index) {
        const newArr = [...arrData];
        newArr.splice(index, 1);
        props.updateParentState(props.fieldName, newArr);
    }

    function handleInput(e) {
        setInputValue(e.target.value);
      }

    return (
        <div>
        <div>
              {newValue ? (<div className="is-flex">
                <input type="text" placeholder={props.placeholder} autoFocus className="input is-small" onChange={handleInput}/>  <button onClick={addArr} className="">+</button>
            </div>) : <button className="button is-success" onClick={() => setNewValue(true)}>{props.Btn}</button>}
        </div>
            {arrData && arrData.map((data, index) => (
                <div key={index} onClick={() => deleteArr(index)} className="m-2 button is-info is-rounded" id="item">
                    <p>{data}</p>
                </div>
            ))}
            </div>
    );
}

export default HandleArray;