import React, { ReactElement } from 'react';
import { Table } from '../../base-components/table/Table';


function GrocerySupplyAddItemDialog(): ReactElement {
   return (
      <>
         <h2>Add Grocery Items</h2>
         <div id="import-shopping-list-button-container">
            <button type="button" onClick={() => {}}>Import Shopping List</button>
         </div>
         <Table
            headerList={['Id', 'Product', '']}
            rowList={[]}
         />
         <div id="save-button-container">
            <button type="button" onClick={() => {}}>Save</button>
         </div>
      </>
   );
}


export { GrocerySupplyAddItemDialog };
