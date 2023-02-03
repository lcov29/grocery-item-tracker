import React, { ReactElement, useEffect, useState } from 'react';
import { Category } from '../../base-components/category/Category';
import { Table } from '../../base-components/table/Table';
import { Counter } from '../../base-components/counter/Counter';
import './home.css';


const expirationHeaderList = ['Id', 'Product', 'Expiration Date'];
const expirationRowList = [
   ['12', 'Spaghetti', '03.02.2023'],
   ['24', 'Mineral Water (6 x 1.5 liter)', '12.11.2025']
];


function Home(): ReactElement {

   const [supplyOverviewData, setSupplyOverviewData] = useState({});
   const [expriationData, setExpirationData] = useState({});


   async function fetchData(route: string, handler: (value: JSON) => void) {
      const response = await fetch(route);
      if (response.ok) {
         const data = await response.json();
         handler(data);
      }
   }


   useEffect(() => {
      const pageId = window.location.hash.replace('#', '');
      fetchData(`/${pageId}/data/supplyOverview`, setSupplyOverviewData);
      fetchData(`/${pageId}/data/expirationDateOverview/5`, setExpirationData);
   }, []);


   return (
      <>
         <div id="supplyOverviewContainer">
            <h2>Supply Overview</h2>
            <h2>{ supplyOverviewData.response }</h2>
            <Category
               name="Food"
               isTopLevel
               contentList={[
                  <Category
                     name="Bread"
                     key={1}
                     additionalText="7 Items"
                     contentList={[
                        <Table
                           headerList={['Product', 'Amount']}
                           rowList={[
                              ['Toast', '4'],
                              ['Baguette', '2']
                           ]}
                        />
                     ]}
                  />,
                  <Category
                     name="Noodles"
                     key={2}
                     additionalText="2 Items"
                  />
               ]}
            />
         </div>
         <div id="upcomingExpirationDatesContainer">
            <h2>Upcoming Expiration Dates</h2>
            <h2>{ expriationData.response }</h2>
            <div className="counter-container">
               <Counter value={4} minimum={0} maximum={14} suffix="Days" />
            </div>
            <Table headerList={expirationHeaderList} rowList={expirationRowList} />
         </div>
      </>
   );

}


export { Home };
