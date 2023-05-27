import React, { ReactElement } from 'react';
import homeIcon from '../../../../icons/homeIcon.svg';
import groceryItemIcon from '../../../../icons/groceryItemIcon.svg';
import shoppingListIcon from '../../../../icons/shoppingCartIcon.svg';
import reportsIcon from '../../../../icons/reportIcon.svg';
import settingsIcons from '../../../../icons/settingIcon.svg';
import { NavigationIcon } from '../NavigationIcon';
import { SupplyOptionDropdownContent } from '../supplyOptionDropdownContent/SupplyOptionDropdownContent';
import { MenuBar } from '../../../base-components/menuBar/MenuBar';
import { pageId } from '../../../../routing/routing';
import './navigationBar.css';


type NavigationBarProps = {
   currentPageId: string,
   setCurrentPageId: (a: string) => void
};


function NavigationBar(props: NavigationBarProps): ReactElement {
   const { currentPageId, setCurrentPageId } = props;


   function isPageActive(id: string): boolean {
      return currentPageId === id;
   }


   const menuEntryList = [
      {
         button: {
            content: <NavigationIcon icon={homeIcon} alternativeText="Home" title="Home" />,
            action: () => { setCurrentPageId(pageId.home); },
         },
         isActive: isPageActive(pageId.home)
      },
      {
         button: {
            content: <NavigationIcon icon={groceryItemIcon} alternativeText="Supply" title="Supply" />
         },
         dropdown: <SupplyOptionDropdownContent setCurrentPageId={setCurrentPageId} />,
         isActive: isPageActive(pageId.supplyOverview)
                  || isPageActive(pageId.supplyMinimum)
                  || isPageActive(pageId.addSupplyItems)
                  || isPageActive(pageId.consumeSupplyItems)
      },
      {
         button: {
            content: (
               <NavigationIcon
                  icon={shoppingListIcon}
                  alternativeText="Shopping List"
                  title="Shopping List"
               />
            ),
            action: () => { setCurrentPageId(pageId.shoppingList); },
         },
         isActive: isPageActive(pageId.shoppingList)
      },
      {
         button: {
            content: <NavigationIcon icon={reportsIcon} alternativeText="Reports" title="Reports" />,
            action: () => { setCurrentPageId(pageId.reports); },
         },
         isActive: isPageActive(pageId.reports)
      },
      {
         button: {
            content: <NavigationIcon icon={settingsIcons} alternativeText="Settings" title="Settings" />,
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
