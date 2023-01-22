/*
import React, { ReactElement } from 'react';
import { MenuBar } from '../../components/menuBar/MenuBar';
import { Category } from '../../components/category/Category';
import { Table } from '../../components/table/Table';
import './home-style.css';

const menuEntryList = [
   { entryText: 'Home' },
   { entryText: 'Grocery Items' },
   { entryText: 'Shopping List' },
   { entryText: 'Reports' },
   { entryText: 'Settings' }
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

*/
