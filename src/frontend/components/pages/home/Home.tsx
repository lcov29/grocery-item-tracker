import React, { ReactElement } from 'react';
import { SupplyOverviewHome } from '../../application-components/supplyOverviewHome/SupplyOverviewHome';
import { ExpirationDateOverview } from '../../application-components/expirationDateOverview/ExpirationDateOverview';
import './home.css';


function Home(): ReactElement {
   return (
      <>
         <div id="supplyOverviewContainer">
            <SupplyOverviewHome />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <ExpirationDateOverview />
         </div>
      </>
   );

}


export { Home };
