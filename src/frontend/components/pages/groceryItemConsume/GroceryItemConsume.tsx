import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData } from '../../../utility/fetchServerData';
import { Table } from '../../base-components/table/Table';
import { UnconsumedItemId } from '../../../../tsDataTypes/tsTypeGroceryItemConsume';
import './groceryItemConsume.css';


function GroceryItemConsume(): ReactElement {

   const [idList, setIdList] = useState<UnconsumedItemId[]>([]);


   useEffect(() => {
      fetchData<UnconsumedItemId[]>('/api/GroceryItemConsume/unconsumedItemIdList', setIdList);
   }, []);


   function buildUnconsumedItemIdList(): string[] {
      return idList.map((element) => element.id.toString(), 10);
   }


   return (
      <div id="grocery-item-consume-container">
         <h2>Consume Grocery Items</h2>
         <Table
            headerList={['Id', 'Product Name', 'Expiration Date', 'Amount', '']}
            rowList={[
               [
                  '123',
                  'Apples (1Kg)',
                  '1kg',
                  '05.02.2023',
                  <button type="button" onClick={() => {}}>Remove</button>
               ],
               [
                  '5642',
                  'Cornflakes',
                  '750g',
                  '24.11.2028',
                  <button type="button" onClick={() => {}}>Remove</button>
               ],
               [
                  <SearchableDropdown
                     id="grocery-item-consume-searchbar"
                     placeholderText="Unconsumed Product Id"
                     optionList={buildUnconsumedItemIdList()}
                  />,
                  '',
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
