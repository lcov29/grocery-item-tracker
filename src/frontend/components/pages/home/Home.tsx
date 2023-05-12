import React, { ReactElement } from 'react';
import { SupplyOverview } from '../../application-components/supplyOverview/SupplyOverview';
import { ExpirationDateOverview } from '../../application-components/expirationDateOverview/ExpirationDateOverview';
import './home.css';


function Home(): ReactElement {
   return (
      <>
         <div id="supplyOverviewContainer">
            <SupplyOverview />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <ExpirationDateOverview />
         </div>
      </>
   );

}


export { Home };
