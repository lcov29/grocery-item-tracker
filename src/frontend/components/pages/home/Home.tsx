import React, { ReactElement } from 'react';
import { GrocerySupplyOverviewHome } from '../../application-components/grocerySupplyOverviewHome/GrocerySupplyOverviewHome';
import { ExpirationDateOverview } from '../../application-components/expirationDateOverview/ExpirationDateOverview';
import './home.css';


function Home(): ReactElement {
   return (
      <>
         <div id="supplyOverviewContainer">
            <GrocerySupplyOverviewHome />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <ExpirationDateOverview />
         </div>
      </>
   );

}


export { Home };
