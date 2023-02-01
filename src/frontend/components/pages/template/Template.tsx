import React, { ReactElement, useState } from 'react';
import { MenuBar } from '../../base-components/menuBar/MenuBar';
import { MenuGroceryOptionDropdownContent } from '../../application-components/menuGroceryOptionDropdownContent/MenuGroceryOptionDropdownContent';
import { Home } from '../home/Home';
import { SupplyOverview } from '../supplyOverview/SupplyOverview';
import { GroceryItemAdd } from '../groceryItemAdd/GroceryItemAdd';
import { GroceryItemConsume } from '../groceryItemConsume/GroceryItemConsume';
import { Settings } from '../settings/Settings';
import homeIcon from '../../../icons/homeIcon.svg';
import groceryItemIcon from '../../../icons/groceryItemIcon.svg';
import shoppingListIcon from '../../../icons/shoppingCartIcon.svg';
import reportsIcon from '../../../icons/reportIcon.svg';
import settingsIcons from '../../../icons/settingIcon.svg';
import './template.css';


function createIcon(src: string, alt: string): ReactElement {
   return <img src={src} alt={alt} width="35px" height="35px" />;
}


function Template(): ReactElement {
   const [currentPageId, setCurrentPageId] = useState('Home');


   function isPageActive(pageId: string): boolean {
      return currentPageId === pageId;
   }


   function generateContentSection(): ReactElement | null {
      switch (currentPageId) {
         case 'Home':
            return <Home />;
         case 'GrocerySupplyOverview':
            return <SupplyOverview />;
         case 'GrocerySupplyMinimum':
            return <h2>Coming Soon</h2>;
         case 'GroceryItemAdd':
            return <GroceryItemAdd />;
         case 'GroceryItemConsume':
            return <GroceryItemConsume />;
         case 'ShoppingList':
            return <h2>Coming Soon</h2>;
         case 'Reports':
            return <h2>Coming Soon</h2>;
         case 'Settings':
            return <Settings />;
         default:
            return null;
      }
   }


   const menuEntryList = [
      {
         button: {
            content: createIcon(homeIcon, 'Home'),
            action: () => { setCurrentPageId('Home'); },
            datatarget: 'Home'
         },
         isActive: isPageActive('Home')
      },
      {
         button: { content: createIcon(groceryItemIcon, 'Grocery Items') },
         dropdown: <MenuGroceryOptionDropdownContent setCurrentPageId={setCurrentPageId} />,
         isActive: isPageActive('GrocerySupplyOverview')
                  || isPageActive('GrocerySupplyMinimum')
                  || isPageActive('GroceryItemAdd')
                  || isPageActive('GroceryItemConsume')
      },
      {
         button: {
            content: createIcon(shoppingListIcon, 'Shopping List'),
            action: () => { setCurrentPageId('ShoppingList'); },
            datatarget: 'ShoppingList'
         },
         isActive: isPageActive('ShoppingList')
      },
      {
         button: {
            content: createIcon(reportsIcon, 'Reports'),
            action: () => { setCurrentPageId('Reports'); },
            datatarget: 'Reports'
         },
         isActive: isPageActive('Reports')
      },
      {
         button: {
            content: createIcon(settingsIcons, 'Settings'),
            action: () => { setCurrentPageId('Settings'); },
            datatarget: 'Settings'
         },
         isActive: isPageActive('Settings')
      }
   ];


   return (
      <>
         <header>
            <MenuBar menuEntryList={menuEntryList} />
         </header>
         <main>
            { generateContentSection() }
         </main>
      </>
   );
}


export { Template };
