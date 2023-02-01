import React, { ReactElement } from 'react';
import { Table } from '../../base-components/table/Table';
import './groceryItemAdd.css';


function GroceryItemAdd(): ReactElement {
   return (
      <div id="grocery-item-add-container">
         <h2>Add Grocery Items</h2>
         <div id="import-shopping-list-button-container">
            <button type="button" onClick={() => {}}>
               Import Shopping List
            </button>
         </div>
         <Table
            headerList={['Id', 'Product', '']}
            rowList={[
               [
                  '123',
                  'Spaghetti',
                  <button
                     type="button"
                     className="item-remove-button"
                     onClick={() => {}}
                  >
                     Remove
                  </button>
               ],
               [
                  '754',
                  'Banana',
                  <button
                     type="button"
                     className="item-remove-button"
                     onClick={() => {}}
                  >
                     Remove
                  </button>
               ],
               [
                  '',
                  '',
                  <button
                     type="button"
                     className="item-add-button"
                     onClick={() => {}}
                  >
                     Add Item
                  </button>
               ],
            ]}
         />
         <div id="save-button-container">
            <button type="button" onClick={() => {}}>
               Save
            </button>
         </div>
      </div>
   );
}


export { GroceryItemAdd };
