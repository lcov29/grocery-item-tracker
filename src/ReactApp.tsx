import React, { ReactElement, useState } from 'react';
import { Home } from './frontend/components/pages/home/Home';
import { SupplyOverview } from './frontend/components/pages/supplyOverview/SupplyOverview';
import { GroceryItemAdd } from './frontend/components/pages/groceryItemAdd/GroceryItemAdd';
import { GroceryItemConsume } from './frontend/components/pages/groceryItemConsume/GroceryItemConsume';
import { Settings } from './frontend/components/pages/settings/Settings';
import { NavigationBar } from './frontend/components/application-components/navigationBar/NavigationBar';
import './reactApp.css';


function ReactApp(): ReactElement {
   const [currentPageId, setCurrentPageId] = useState('Home');


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


   return (
      <>
         <NavigationBar currentPageId={currentPageId} setCurrentPageId={setCurrentPageId} />
         <main>
            { generateContentSection() }
         </main>
      </>
   );


}


export { ReactApp };
