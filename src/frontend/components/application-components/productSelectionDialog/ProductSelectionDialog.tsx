/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { Counter } from '../../base-components/counter/Counter';
import { ProductInput } from './productInput/ProductInput';
import { DistributorInput } from './distributorInput/DistributorInput';
import './productSelectionDialog.css';


type ProductSelectionDialogProps = {
   openProductAddDialog: () => void
};


function ProductSelectionDialog(props: ProductSelectionDialogProps): ReactElement {
   const { openProductAddDialog } = props;
   const [amount, setAmount] = useState(1);

   return (
      <div id="grocery-item-product-selection-container">
         <h2>Select Grocery Item</h2>
         <form id="product-selection-dialog" onSubmit={() => {}}>
            <ProductInput openProductAddDialog={openProductAddDialog} />
            <DistributorInput />
            <label htmlFor="input-amount">Amount</label>
            <Counter value={amount} setValue={setAmount} />
            <label htmlFor="input-price-per-unit" className="product-selection-dialog-label">Unit Price</label>
            <input
               id="input-price-per-unit"
               className="product-selection-dialog-input"
               type="number"
               min={1}
               required
            />
            <label htmlFor="input-expiration-date" className="product-selection-dialog-label">Expiration Date</label>
            <input
               id="input-expiration-date"
               className="product-selection-dialog-input"
               type="date"
               required
            />
         </form>
         <div id="add-button-container">
            <button type="button" onClick={() => {}}>Add</button>
         </div>
      </div>
   );

}


export { ProductSelectionDialog };
