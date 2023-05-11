import React, { ReactElement } from 'react';
import homeIcon from '../../../icons/homeIcon.svg';
import groceryItemIcon from '../../../icons/groceryItemIcon.svg';
import shoppingListIcon from '../../../icons/shoppingCartIcon.svg';
import reportsIcon from '../../../icons/reportIcon.svg';
import settingsIcons from '../../../icons/settingIcon.svg';
import { MenuGroceryOptionDropdownContent } from '../menuGroceryOptionDropdownContent/MenuGroceryOptionDropdownContent';
import { MenuBar } from '../../base-components/menuBar/MenuBar';
import { pageId } from '../../../routing/routing';
import './navigationBar.css';


type NavigationBarProps = {
   currentPageId: string,
   setCurrentPageId: (a: string) => void
};


function NavigationBar(props: NavigationBarProps): ReactElement {
   const { currentPageId, setCurrentPageId } = props;


   function generateIcon(src: string, alt: string, title: string): ReactElement {
      return <img src={src} alt={alt} title={title} width="35px" height="35px" />;
   }


   function isPageActive(id: string): boolean {
      return currentPageId === id;
   }


   const menuEntryList = [
      {
         button: {
            content: generateIcon(homeIcon, pageId.home, 'Home'),
            action: () => { setCurrentPageId(pageId.home); },
         },
         isActive: isPageActive(pageId.home)
      },
      {
         button: { content: generateIcon(groceryItemIcon, 'Grocery Items', 'Supply') },
         dropdown: <MenuGroceryOptionDropdownContent setCurrentPageId={setCurrentPageId} />,
         isActive: isPageActive(pageId.grocerySupplyOverview)
                  || isPageActive(pageId.grocerySupplyMinimum)
                  || isPageActive(pageId.groceryItemAdd)
                  || isPageActive(pageId.groceryItemConsume)
      },
      {
         button: {
            content: generateIcon(shoppingListIcon, pageId.shoppingList, 'Shopping List'),
            action: () => { setCurrentPageId(pageId.shoppingList); },
         },
         isActive: isPageActive(pageId.shoppingList)
      },
      {
         button: {
            content: generateIcon(reportsIcon, pageId.reports, 'Reports'),
            action: () => { setCurrentPageId(pageId.reports); },
         },
         isActive: isPageActive(pageId.reports)
      },
      {
         button: {
            content: generateIcon(settingsIcons, pageId.settings, 'Settings'),
            action: () => { setCurrentPageId(pageId.settings); },
         },
         isActive: isPageActive(pageId.settings)
      }
   ];


   return (
      <header>
         <MenuBar menuEntryList={menuEntryList} />
      </header>
   );
}


export { NavigationBar };
