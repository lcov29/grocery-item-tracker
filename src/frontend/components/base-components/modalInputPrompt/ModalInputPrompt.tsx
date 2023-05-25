import React, { ReactElement } from 'react';
import './modalInputPrompt.css';


type Props = {
   title: string,
   displayPrompt: (display: boolean) => void,
   inputValue: string,
   setInputValue: (a: string) => void
   handleSave?: () => void,
};


function ModalInputPrompt(props: Props): ReactElement | null {
   const { title, displayPrompt, inputValue, setInputValue, handleSave = () => {} } = props;

   return (
      <>
         <div className="modal-input-prompt-overlay">&nbsp;</div>
         <div className="modal-input-prompt-window">
            <div className="modal-input-prompt-header">
               <h3>{title}</h3>
               <button type="button" onClick={() => { displayPrompt(false); }}>X</button>
            </div>
            <input
               type="text"
               className="modal-input-prompt-input"
               value={inputValue}
               onChange={(event) => setInputValue(event.target.value)}
            />
            <br />
            <div className="modal-input-prompt-control-bar">
               <button type="button" onClick={handleSave}>Save</button>
            </div>

         </div>
      </>
   );
}


export { ModalInputPrompt };
