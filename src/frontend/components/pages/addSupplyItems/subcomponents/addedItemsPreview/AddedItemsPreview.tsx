import React, { ReactElement } from 'react';
import { Table } from '../../../../base-components/table/Table';
import { parseDatabasePrice } from '../../../../../utility/currencyFunctions/currencyFunctions';
import { parseDatabaseDate } from '../../../../../utility/dateFunctions/dateFunctions';
import { sendData } from '../../../../../utility/fetchServerData';
import { GroceryItemData, AddedItemReceiptData, AddItemToSupplyResponse } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import plusIcon from '../../../../../icons/plusIcon.svg';
import closeIcon from '../../../../../icons/closeIcon.svg';
import './addedItemsPreview.css';


type Props = {
   setAddedItemsReceiptList: (a: AddedItemReceiptData[]) => void,
   openProductSelectionDialog: () => void,
   openAddedItemsReceiptDialog: () => void,
   removeGroceryItemFromList: (a: number) => void,
   groceryItemDataList: GroceryItemData[]
};


function AddedItemsPreview(props: Props): ReactElement {
   const {
      setAddedItemsReceiptList,
      openProductSelectionDialog,
      openAddedItemsReceiptDialog,
      removeGroceryItemFromList,
      groceryItemDataList
   } = props;


   function buildRowList(): (string | ReactElement)[][] {
      const output = groceryItemDataList.map((item) => [
         item.amount.toString(),
         item.productName,
         item.distributor,
         parseDatabasePrice(item.pricePerUnit),
         parseDatabaseDate(item.buyDate),
         parseDatabaseDate(item.expirationDate),
         <button
            type="button"
            title="Remove Item"
            className="added-items-preview-remove-item-button"
            onClick={() => { removeGroceryItemFromList(item.id); }}
         >
            <img src={closeIcon} alt="x" width="15px" height="15px" />
         </button>
      ]);

      // Add last row with add item button
      const button = (
         <button
            type="button"
            title="Add Item"
            className="added-items-preview-add-item-button"
            onClick={openProductSelectionDialog}
         >
            <img
               src={plusIcon}
               alt="+"
               width="15px"
               height="15px"
            />
         </button>
      );
      output.push(['', '', '', '', '', '', button]);
      return output;
   }


   async function addItemsToSupply(): Promise<void> {
      const isGroceryItemListFilled = groceryItemDataList.length > 0;

      if (isGroceryItemListFilled) {
         const response = await sendData<{ data: GroceryItemData[] }, AddItemToSupplyResponse>(
            '/api/addSupplyItems/post/addItemsToSupply',
            { data: groceryItemDataList }
         );
         if (response.ok === 200 && response.data) {
            setAddedItemsReceiptList(response.data);
         }
         openAddedItemsReceiptDialog();
      }
   }


   return (
      <>
         <h2>Add Items To Supply</h2>
         <div className="added-items-preview-table-container">
            <Table
               headerList={['Amount', 'Product', 'Distributor', 'Price', 'Buy Date', 'Expiration Date', ' ']}
               rowList={buildRowList()}
            />
         </div>
         <div className="added-items-preview-save-button-container">
            <button type="button" onClick={addItemsToSupply}>Add To Supply</button>
         </div>
      </>
   );
}


export { AddedItemsPreview };
