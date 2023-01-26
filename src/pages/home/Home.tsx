import React, { ReactElement } from 'react';
import { MenuBar } from '../../components/menuBar/MenuBar';
import { Category } from '../../components/category/Category';
import { Table } from '../../components/table/Table';
import './home-style.css';

/*
button: {
   text: string,
   action?: () => void
},
dropdown?: ReactElement
*/

const menuEntryList = [
   { button: { text: 'Home', action: () => {} } },
   {
      button: { text: 'Grocery Items', action: () => {} },
      dropdown: (
         <>
            <p>Supply</p>
            <p>Add Items</p>
            <p>Consume Items</p>
            <p>Minimum Supply</p>
         </>
      )
   },
   { button: { text: 'Shopping List', action: () => {} } },
   { button: { text: 'Reports', action: () => {} } },
   { button: { text: 'Settings', action: () => {} } }
];

const expirationHeaderList = ['Id', 'Product', 'Expiration Date'];
const expirationRowList = [
   ['12', 'Spaghetti', '03.02.2023'],
   ['24', 'Mineral Water (6 x 1.5 liter)', '12.11.2025']
];


function Home(): ReactElement {
   return (
      <div id="homePageContainer">
         <div id="menuBarContainer">
            <MenuBar menuEntryList={menuEntryList} />
         </div>
         <div id="supplyOverviewContainer">
            <h2>Supply Overview</h2>
            <Category name="Food" isTopLevel />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <h2>Upcoming Expiration Dates</h2>
            <Table headerList={expirationHeaderList} rowList={expirationRowList} />
         </div>
      </div>
   );
}


export { Home };
