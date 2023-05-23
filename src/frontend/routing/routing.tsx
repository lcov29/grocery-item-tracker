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
   supplyOverview: 'SupplyOverview',
   supplyMinimum: 'SupplyMinimum',
   addSupplyItems: 'AddSupplyItems',
   consumeSupplyItems: 'ConsumeSupplyItems',
   shoppingList: 'ShoppingList',
   reports: 'Reports',
   settings: 'Settings'
};


function getContentSectionFor(currentPageId: string): ReactElement | null {
   switch (currentPageId) {
      case pageId.home:
         return <Home />;
      case pageId.supplyOverview:
         return <SupplyOverview />;
      case pageId.supplyMinimum:
         return <h2>Coming Soon</h2>;
      case pageId.addSupplyItems:
         return <AddSupplyItems />;
      case pageId.consumeSupplyItems:
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
