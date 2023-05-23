import React, { ReactElement } from 'react';
import { SupplyOverview } from '../../sharedComponents/supplyOverview/SupplyOverview';
import { ExpirationDateOverview } from '../../application-components/expirationDateOverview/ExpirationDateOverview';
import './home.css';


function Home(): ReactElement {
   return (
      <main id="home-main">
         <div className="home-container">
            <SupplyOverview />
         </div>
         <div className="home-container">
            <ExpirationDateOverview />
         </div>
      </main>
   );

}


export { Home };
