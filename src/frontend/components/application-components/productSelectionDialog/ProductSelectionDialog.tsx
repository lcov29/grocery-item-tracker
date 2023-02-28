/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { Counter } from '../../base-components/counter/Counter';
import { ProductInput } from './productInput/ProductInput';
import { DistributorInput } from './distributorInput/DistributorInput';
import { GroceryItemData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { getInputValue } from '../../../utility/inputValue';
import './productSelectionDialog.css';


type ProductSelectionDialogProps = {
   addGroceryItemData: (data: GroceryItemData) => void,
   openItemAddOverview: () => void,
   openProductAddDialog: () => void
};


function ProductSelectionDialog(props: ProductSelectionDialogProps): ReactElement {
   const { addGroceryItemData, openItemAddOverview, openProductAddDialog } = props;
   const [amount, setAmount] = useState(1);


   function addGroceryItemDataToList(): void {
      const productName = getInputValue('productName');
      const distributor = getInputValue('distributor');
      const pricePerUnit = Number.parseInt(getInputValue('input-price-per-unit'), 10);
      const expirationDate = getInputValue('input-expiration-date');
      addGroceryItemData({ productName, distributor, amount, pricePerUnit, expirationDate });
      openItemAddOverview();
   }


   return (
      <div id="grocery-item-product-selection-container">
         <h2>Select Grocery Item</h2>
         <form id="product-selection-dialog">
            <ProductInput openProductAddDialog={openProductAddDialog} />
            <DistributorInput />
            <label htmlFor="input-amount">Amount</label>
            <Counter value={amount} setValue={setAmount} />
            <input type="text" name="amount" className="input-amount-hidden" value={amount} readOnly />
            <label htmlFor="input-price-per-unit" className="product-selection-dialog-label">Unit Price</label>
            <input
               id="input-price-per-unit"
               name="pricePerUnit"
               className="product-selection-dialog-input"
               type="number"
               min={1}
               required
            />
            <label htmlFor="input-expiration-date" className="product-selection-dialog-label">Expiration Date</label>
            <input
               id="input-expiration-date"
               name="expirationDate"
               className="product-selection-dialog-input"
               type="date"
               required
            />
            <div id="add-button-container">
               <button type="button" onClick={addGroceryItemDataToList}>Add</button>
            </div>
         </form>
      </div>
   );
}


export { ProductSelectionDialog };
