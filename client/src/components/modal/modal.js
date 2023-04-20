import GptWidget from '../gptWidget/index'
import './modal.css'
import {BsFillChatDotsFill} from 'react-icons/bs';

const Modal = ({isWidget , isModal}) => {
    return (
      <div id="parent">
      {
        isWidget && <GptWidget/>
      }    
      
      <button id='btnWgt' className="" onClick={isModal}><BsFillChatDotsFill id='icon'/></button>
      </div>
    )
    console.log(isWidget)
  }
 
export default Modal;