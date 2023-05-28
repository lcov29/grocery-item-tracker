/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { Counter } from '../../../../base-components/counter/Counter';
import { ProductInput } from './subcomponents/productInput/ProductInput';
import { DistributorInput } from './subcomponents/distributorInput/DistributorInput';
import { GroceryItemData } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import backIcon from '../../../../../icons/backArrowIcon.svg';
import './productSelection.css';


type ProductSelectionDialogProps = {
   addGroceryItemData: (data: GroceryItemData) => void,
   openAddedItemPreviewDialog: () => void,
   openProductAddDialog: () => void
};


function ProductSelection(props: ProductSelectionDialogProps): ReactElement {
   const { addGroceryItemData, openAddedItemPreviewDialog, openProductAddDialog } = props;

   const [productName, setProductName] = useState('');
   const [distributor, setDistributor] = useState('');
   const [amount, setAmount] = useState(1);
   const [unitPrice, setUnitPrice] = useState(1);
   const [expirationDate, setExpirationDate] = useState('');


   function addGroceryItemDataToList(): void {
      const payload = {
         id: -1,
         productName,
         distributor,
         amount,
         pricePerUnit: unitPrice,
         expirationDate
      };
      addGroceryItemData(payload);
      openAddedItemPreviewDialog();
   }


   return (
      <div>
         <h2>Select Item To Add</h2>
         <form className="product-selection-form">
            <ProductInput
               openProductAddDialog={openProductAddDialog}
               setProductInput={setProductName}
               productInput={productName}
            />
            <DistributorInput
               distributorInput={distributor}
               setDistributorInput={setDistributor}
            />
            <label>Amount</label>
            <Counter value={amount} setValue={setAmount} minimum={1} />
            <label htmlFor="input-price-per-unit">Price</label>
            <input
               id="input-price-per-unit"
               name="pricePerUnit"
               className="product-selection-input"
               type="number"
               min={1}
               value={unitPrice}
               onChange={(e) => { setUnitPrice(Number.parseInt(e.target.value, 10)); }}
               required
            />
            <label htmlFor="input-expiration-date">Expiration Date</label>
            <input
               id="input-expiration-date"
               name="expirationDate"
               className="product-selection-input"
               type="date"
               value={expirationDate}
               onChange={(e) => { setExpirationDate(e.target.value); }}
               required
            />
         </form>
         <div className="product-selection-add-button-container">
            <button type="button" onClick={openAddedItemPreviewDialog}>
               <img src={backIcon} alt="Back" width="25px" height="25px" />
            </button>
            <button type="button" onClick={addGroceryItemDataToList}>OK</button>
         </div>
      </div>
   );
}


export { ProductSelection };
