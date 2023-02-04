import React, { ReactElement, useEffect, useState } from 'react';
import { GrocerySupplyOverviewHome, TopCategory } from '../../application-components/grocerySupplyOverviewHome/GrocerySupplyOverviewHome';
import { ExpirationDateOverview } from '../../application-components/expirationDateOverview/ExpirationDateOverview';
import { fetchData, getPageId } from '../../../utility/fetchServerData';
import './home.css';


function Home(): ReactElement {
   const [supplyOverviewData, setSupplyOverviewData] = useState({});


   useEffect(() => {
      fetchData(`/${getPageId()}/data/supplyOverview`, setSupplyOverviewData);
   }, []);


   return (
      <>
         <div id="supplyOverviewContainer">
            <GrocerySupplyOverviewHome
               topCategoryList={
                  ('data' in supplyOverviewData) ? supplyOverviewData.data as TopCategory[] : undefined
               }
            />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <ExpirationDateOverview />
         </div>
      </>
   );

}


export { Home };
