import React, { ReactElement } from 'react';
import { Table } from '../../../../base-components/table/Table';
import { parseDatabaseDate } from '../../../../../utility/dateFunctions/dateFunctions';
import { sendData } from '../../../../../utility/fetchServerData';
import { GroceryItemData, AddedItemReceiptData, AddItemToSupplyResponse } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
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
         parseDatabaseDate(item.buyDate),
         parseDatabaseDate(item.expirationDate),
         <button
            type="button"
            onClick={() => { removeGroceryItemFromList(item.id); }}
            title="Remove"
         >
            x
         </button>
      ]);

      // Add last row with add item button
      const button = (
         <button
            type="button"
            title="Add Item"
            onClick={openProductSelectionDialog}
         >
            +
         </button>
      );
      output.push(['', '', '', '', '', button]);
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
         <Table
            headerList={['Amount', 'Product', 'Distributor', 'Buy Date', 'Expiration Date', ' ']}
            rowList={buildRowList()}
         />
         <div className="added-items-preview-save-button-container">
            <button type="button" onClick={addItemsToSupply}>Add To Supply</button>
         </div>
      </>
   );
}


export { AddedItemsPreview };
