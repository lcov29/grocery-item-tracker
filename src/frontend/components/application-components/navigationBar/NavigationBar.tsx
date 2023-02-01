import React, { ReactElement } from 'react';
import homeIcon from '../../../icons/homeIcon.svg';
import groceryItemIcon from '../../../icons/groceryItemIcon.svg';
import shoppingListIcon from '../../../icons/shoppingCartIcon.svg';
import reportsIcon from '../../../icons/reportIcon.svg';
import settingsIcons from '../../../icons/settingIcon.svg';
import { MenuGroceryOptionDropdownContent } from '../menuGroceryOptionDropdownContent/MenuGroceryOptionDropdownContent';
import { MenuBar } from '../../base-components/menuBar/MenuBar';
import './navigationBar.css';


type NavigationBarProps = {
   currentPageId: string,
   setCurrentPageId: (a: string) => void
};


function NavigationBar(props: NavigationBarProps): ReactElement {
   const { currentPageId, setCurrentPageId } = props;


   function generateIcon(src: string, alt: string): ReactElement {
      return <img src={src} alt={alt} width="35px" height="35px" />;
   }


   function isPageActive(pageId: string): boolean {
      return currentPageId === pageId;
   }


   const menuEntryList = [
      {
         button: {
            content: generateIcon(homeIcon, 'Home'),
            action: () => { setCurrentPageId('Home'); },
            datatarget: 'Home'
         },
         isActive: isPageActive('Home')
      },
      {
         button: { content: generateIcon(groceryItemIcon, 'Grocery Items') },
         dropdown: <MenuGroceryOptionDropdownContent setCurrentPageId={setCurrentPageId} />,
         isActive: isPageActive('GrocerySupplyOverview')
                  || isPageActive('GrocerySupplyMinimum')
                  || isPageActive('GroceryItemAdd')
                  || isPageActive('GroceryItemConsume')
      },
      {
         button: {
            content: generateIcon(shoppingListIcon, 'Shopping List'),
            action: () => { setCurrentPageId('ShoppingList'); },
            datatarget: 'ShoppingList'
         },
         isActive: isPageActive('ShoppingList')
      },
      {
         button: {
            content: generateIcon(reportsIcon, 'Reports'),
            action: () => { setCurrentPageId('Reports'); },
            datatarget: 'Reports'
         },
         isActive: isPageActive('Reports')
      },
      {
         button: {
            content: generateIcon(settingsIcons, 'Settings'),
            action: () => { setCurrentPageId('Settings'); },
            datatarget: 'Settings'
         },
         isActive: isPageActive('Settings')
      }
   ];


   return (
      <header>
         <MenuBar menuEntryList={menuEntryList} />
      </header>
   );
}


export { NavigationBar };
