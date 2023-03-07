import React, { ReactElement, useEffect } from 'react';
import { Category } from '../../base-components/category/Category';
import { Table } from '../../base-components/table/Table';
import { SearchBar } from '../../base-components/searchBar/SearchBar';
import './supplyOverview.css';


async function testServerRequest() {
   try {
      const response = await fetch('/api/GrocerySupplyList/supplyList');
      console.log(await response.json());
   } catch {
      console.log('Error');
   }
}


function SupplyOverview(): ReactElement {


   useEffect(() => { testServerRequest(); }, []);


   return (
      <div id="supply-overview-container">
         <h2>Supply Overview</h2>
         <div id="supply-overview-control-bar">
            <button type="button">Filter</button>
            <SearchBar
               id="supply-overview-search-bar"
               placeholderText="Enter Text..."
               optionList={['Option 1', 'Option 2', 'Option 3']}
            />
         </div>
         <Category
            name="Food"
            isTopLevel
            contentList={[
               <Category
                  name="Bread"
                  key={1}
                  additionalText="7 Items"
                  contentList={[
                     <Category
                        name="Toast"
                        key={1}
                        additionalText="4 Items"
                        contentList={[
                           <Table
                              headerList={['Id', 'Product', 'Amount']}
                              rowList={[
                                 ['1', 'Toast', '4'],
                                 ['2', 'Baguette', '2']
                              ]}
                           />
                        ]}
                     />
                  ]}
               />,
               <Category
                  name="Noodles"
                  key={2}
                  additionalText="2 Items"
                  contentList={[
                     <Table
                        headerList={['Id', 'Product', 'Amount']}
                        rowList={[
                           ['242', 'Spaghetti', '13'],
                           ['673', 'Ravioli', '3'],
                           ['342', 'Spirelli', '5']
                        ]}
                     />
                  ]}
               />
            ]}
         />
         <Category
            name="Beverages"
            isTopLevel
            contentList={[
               <Category
                  name="Water"
                  key={1}
                  additionalText="6 Items"
                  contentList={[]}
               />,
               <Category
                  name="Orange Juice"
                  key={2}
                  additionalText="4 Items"
                  contentList={[]}
               />
            ]}
         />
      </div>
   );

}


export { SupplyOverview };
