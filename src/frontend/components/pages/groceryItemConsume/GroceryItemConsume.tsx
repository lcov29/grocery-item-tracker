import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { Table } from '../../base-components/table/Table';
import './groceryItemConsume.css';


function GroceryItemConsume(): ReactElement {

   return (
      <div id="grocery-item-consume-container">
         <h2>Consume Grocery Items</h2>
         <Table
            headerList={['Id', 'Product Name', 'Expiration Date', '']}
            rowList={[
               [
                  '123',
                  'Apples (1Kg)',
                  '05.02.2023',
                  <button type="button" onClick={() => {}}>Remove</button>
               ],
               [
                  '5642',
                  'Cornflakes',
                  '24.11.2028',
                  <button type="button" onClick={() => {}}>Remove</button>
               ],
               [
                  <SearchableDropdown
                     id="grocery-item-consume-searchbar"
                     placeholderText="Unconsumed Product Id"
                     optionList={['123', '534', '632', '553']}
                  />,
                  '',
                  '',
                  ''
               ]
            ]}
         />
         <div id="grocery-item-consume-consume-button-container">
            <button type="button" onClick={() => {}}>Consume</button>
         </div>
      </div>
   );

}


export { GroceryItemConsume };
