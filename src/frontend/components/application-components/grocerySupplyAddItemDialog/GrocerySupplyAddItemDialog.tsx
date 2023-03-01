import React, { ReactElement } from 'react';
import { Table } from '../../base-components/table/Table';
import { GroceryItemData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';


type GrocerySupplyAddItemProps = {
   openItemAddDialog: () => void;
   groceryItemDataList: GroceryItemData[]
};


function GrocerySupplyAddItemDialog(props: GrocerySupplyAddItemProps): ReactElement {
   const { openItemAddDialog, groceryItemDataList } = props;


   function buildRowList(): (string | ReactElement)[][] {
      const output = groceryItemDataList.map((item) => [
         item.amount.toString(),
         item.productName,
         item.distributor,
         item.expirationDate,
         <button type="button">x</button>
      ]);

      // Add last row with add item button
      output.push(['', '', '', '', <button type="button" onClick={openItemAddDialog}>+</button>]);
      return output;
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
            <button type="button" onClick={() => {}}>Save</button>
         </div>
      </>
   );
}


export { GrocerySupplyAddItemDialog };
