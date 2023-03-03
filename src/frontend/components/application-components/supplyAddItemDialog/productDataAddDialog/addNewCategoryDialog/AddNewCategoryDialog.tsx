/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import { getInputValue } from '../../../../../utility/inputValue';
import './addNewCategoryDialog.css';


type AddNewCategoryDialogParams = {
   displayDialog: (display: boolean) => void,
   titleText: string,
   labelText: string,
   handleSave: (inputValue: string) => void
};


function AddNewCategoryDialog(props: AddNewCategoryDialogParams): ReactElement | null {
   const {
      displayDialog,
      titleText,
      labelText,
      handleSave
   } = props;

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
            />
            <br />
            <div className="product-add-dialog-modal-window-control-bar">
               <button
                  type="button"
                  onClick={() => { displayDialog(false); }}
               >
                  Cancel
               </button>
               <button
                  type="button"
                  onClick={() => { handleSave(getInputValue('product-add-dialog-new-category-input')); }}
               >
                  Save
               </button>
            </div>

         </div>
      </>
   );
}


export { AddNewCategoryDialog };
