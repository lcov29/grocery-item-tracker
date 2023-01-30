import React, { ReactElement } from 'react';
import { Category } from '../../components/base-components/category/Category';
import { Table } from '../../components/base-components/table/Table';
import { Counter } from '../../components/base-components/counter/Counter';
import { Template } from '../template/Template';
import './home.css';


const expirationHeaderList = ['Id', 'Product', 'Expiration Date'];
const expirationRowList = [
   ['12', 'Spaghetti', '03.02.2023'],
   ['24', 'Mineral Water (6 x 1.5 liter)', '12.11.2025']
];


function Home(): ReactElement {
   const content = (
      <>
         <div id="supplyOverviewContainer">
            <h2>Supply Overview</h2>
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
                           headerList={['Id', 'Product', 'Amount']}
                           rowList={[
                              ['1', 'Toast', '4'],
                              ['2', 'Baguette', '2']
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
            <div className="counter-container">
               <Counter value={4} minimum={0} maximum={14} suffix="Days" />
            </div>
            <Table headerList={expirationHeaderList} rowList={expirationRowList} />
         </div>
      </>
   );

   return <Template content={content} />;
}


export { Home };
