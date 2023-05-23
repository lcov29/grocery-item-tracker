import React, { ReactElement } from 'react';
import { Home } from '../components/pages/home/Home';
import { SupplyOverview } from '../components/pages/supplyOverview/SupplyOverview';
import { AddSupplyItems } from '../components/pages/addSupplyItems/AddSupplyItems';
import { ConsumeSupplyItems } from '../components/pages/consumeSupplyItems/ConsumeSupplyItems';
import { Settings } from '../components/pages/settings/Settings';


function addToHistory(pageId: string): void {
   window.location.hash = pageId;
}


const pageId = {
   home: 'Home',
   grocerySupplyOverview: 'GrocerySupplyOverview',
   grocerySupplyMinimum: 'GrocerySupplyMinimum',
   groceryItemAdd: 'GroceryItemAdd',
   groceryItemConsume: 'GroceryItemConsume',
   shoppingList: 'ShoppingList',
   reports: 'Reports',
   settings: 'Settings'
};


function getContentSectionFor(currentPageId: string): ReactElement | null {
   switch (currentPageId) {
      case pageId.home:
         return <Home />;
      case pageId.grocerySupplyOverview:
         return <SupplyOverview />;
      case pageId.grocerySupplyMinimum:
         return <h2>Coming Soon</h2>;
      case pageId.groceryItemAdd:
         return <AddSupplyItems />;
      case pageId.groceryItemConsume:
         return <ConsumeSupplyItems />;
      case pageId.shoppingList:
         return <h2>Coming Soon</h2>;
      case pageId.reports:
         return <h2>Coming Soon</h2>;
      case pageId.settings:
         return <Settings />;
      default:
         return null;
   }
}


function routeContentSection(currentPageId: string): ReactElement | null {
   addToHistory(currentPageId);
   return getContentSectionFor(currentPageId);
}


export { pageId, routeContentSection };
