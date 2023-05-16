import React, { ReactElement } from 'react';
import { Table } from '../../../base-components/table/Table';
import { GroceryItemData, AddedItemReceiptData, AddItemToSupplyResponse } from '../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { parseDatabaseDate } from '../../../../utility/parseDate';
import { sendData } from '../../../../utility/fetchServerData';


type Props = {
   setAddedItemsReceiptList: (a: AddedItemReceiptData[]) => void,
   openItemAddDialog: () => void,
   openAddedItemsReceipt: () => void,
   removeGroceryItemFromList: (a: number) => void,
   groceryItemDataList: GroceryItemData[]
};


function SupplyAddItemDialog(props: Props): ReactElement {
   const {
      setAddedItemsReceiptList,
      openItemAddDialog,
      openAddedItemsReceipt,
      removeGroceryItemFromList,
      groceryItemDataList
   } = props;


   function buildRowList(): (string | ReactElement)[][] {
      const output = groceryItemDataList.map((item) => [
         item.amount.toString(),
         item.productName,
         item.distributor,
         parseDatabaseDate(item.expirationDate),
         <button type="button" onClick={() => { removeGroceryItemFromList(item.id); }}>x</button>
      ]);

      // Add last row with add item button
      output.push(['', '', '', '', <button type="button" onClick={openItemAddDialog}>+</button>]);
      return output;
   }


   async function addItemsToSupply(): Promise<void> {
      const isGroceryItemListFilled = groceryItemDataList.length > 0;

      if (isGroceryItemListFilled) {
         const response = await sendData<{ data: GroceryItemData[] }, AddItemToSupplyResponse>(
            '/api/groceryItemAdd/addItemsToSupply',
            { data: groceryItemDataList }
         );
         if (response.ok === 200 && response.data) {
            setAddedItemsReceiptList(response.data);
         }
         openAddedItemsReceipt();
      }
   }


   return (
      <>
         <h2>Add Grocery Items</h2>
         <div id="import-shopping-list-button-container">
            <button type="button" onClick={() => {}}>Import Shopping List</button>
         </div>
         <Table
            headerList={['Amount', 'Product', 'Distributor', 'Expiration Date', ' ']}
            rowList={buildRowList()}
         />
         <div id="save-button-container">
            <button type="button" onClick={addItemsToSupply}>Save</button>
         </div>
      </>
   );
}


export { SupplyAddItemDialog };
