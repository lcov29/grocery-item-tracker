import React, { ReactElement } from 'react';
import { MenuBar } from '../../components/base-components/menuBar/MenuBar';
import { Category } from '../../components/base-components/category/Category';
import { Table } from '../../components/base-components/table/Table';
import home from '../../icons/homeIcon.svg';
import groceryItem from '../../icons/groceryItemIcon.svg';
import shoppingList from '../../icons/shoppingCartIcon.svg';
import reports from '../../icons/reportIcon.svg';
import settings from '../../icons/settingIcon.svg';
import './home-style.css';


const menuEntryList = [
   { button: { content: <img src={home} alt="Home" width="50px" height="50px" />, action: () => {} } },
   {
      button: { content: <img src={groceryItem} alt="Grocery Items" width="50px" height="50px" />, action: () => {} },
      dropdown: (
         <>
            <p>Supply</p>
            <p>Add Items</p>
            <p>Consume Items</p>
            <p>Minimum Supply</p>
         </>
      )
   },
   { button: { content: <img src={shoppingList} alt="Shopping List" width="50px" height="50px" />, action: () => {} } },
   { button: { content: <img src={reports} alt="Reports" width="50px" height="50px" />, action: () => {} } },
   { button: { content: <img src={settings} alt="Settings" width="50px" height="50px" />, action: () => {} } }
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
            <Category
               name="Food"
               isTopLevel
               contentList={[
                  <Category
                     name="Bread"
                     additionalText="7 Items"
                     contentList={[
                        <Table
                           headerList={['Id', 'Product', 'Amount']}
                           rowList={[
                              ['1', 'Toast', '4'],
                              ['2', 'Baguette', '2']
                           ]}
                        />
                     ]}
                  />,
                  <Category
                     name="Noodles"
                     additionalText="2 Items"
                  />
               ]}
            />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <h2>Upcoming Expiration Dates</h2>
            <Table headerList={expirationHeaderList} rowList={expirationRowList} />
         </div>
      </div>
   );
}


export { Home };
