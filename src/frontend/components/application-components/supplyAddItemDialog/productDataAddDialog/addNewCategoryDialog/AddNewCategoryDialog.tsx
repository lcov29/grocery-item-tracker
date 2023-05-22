import React, { ReactElement } from 'react';
import './addNewCategoryDialog.css';


type AddNewCategoryDialogParams = {
   displayDialog: (display: boolean) => void,
   titleText: string,
   labelText: string,
   handleSave: () => void,
   inputValue: string,
   setInputValue: (a: string) => void
};


function AddNewCategoryDialog(props: AddNewCategoryDialogParams): ReactElement | null {
   const { displayDialog, titleText, labelText, handleSave, inputValue, setInputValue } = props;

   return (
      <>
         <div className="product-add-dialog-modal-overlay">&nbsp;</div>
         <div id="product-add-dialog-new-category-modal-window">
            <h3>{titleText}</h3>
            <label htmlFor="product-add-dialog-new-category-input" className="product-data-label">
               {labelText}
            </label>
            <input
               type="text"
               id="product-add-dialog-new-category-input"
               name="categoryName"
               className="product-add-dialog-input-field"
               value={inputValue}
               onChange={(event) => setInputValue(event.target.value)}
            />
            <br />
            <div className="product-add-dialog-modal-window-control-bar">
               <button type="button" onClick={() => { displayDialog(false); }}>Cancel</button>
               <button type="button" onClick={handleSave}>Save</button>
            </div>

         </div>
      </>
   );
}


export { AddNewCategoryDialog };
