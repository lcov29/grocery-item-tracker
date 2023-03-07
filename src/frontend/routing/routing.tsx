import React, { ReactElement } from 'react';
import { Home } from '../components/pages/home/Home';
import { SupplyList } from '../components/pages/supplyList/SupplyList';
import { GroceryItemAdd } from '../components/pages/groceryItemAdd/GroceryItemAdd';
import { GroceryItemConsume } from '../components/pages/groceryItemConsume/GroceryItemConsume';
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
         return <SupplyList />;
      case pageId.grocerySupplyMinimum:
         return <h2>Coming Soon</h2>;
      case pageId.groceryItemAdd:
         return <GroceryItemAdd />;
      case pageId.groceryItemConsume:
         return <GroceryItemConsume />;
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
