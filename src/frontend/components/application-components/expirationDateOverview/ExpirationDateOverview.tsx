import React, { ReactElement, useState, useEffect } from 'react';
import { Counter } from '../../base-components/counter/Counter';
import { Table } from '../../base-components/table/Table';
import { fetchData, getPageId } from '../../../utility/fetchServerData';


type ExpirationData = {
   id: number,
   product: string,
   expirationDate: string
};


function ExpirationDateOverview(): ReactElement {
   const [dayLimit, setDayLimit] = useState(7);
   const [expirationData, setExpirationData] = useState({});


   useEffect(() => {
      fetchData(`/${getPageId()}/data/expirationDateOverview/${dayLimit}`, setExpirationData);
   }, []);



   function generateTable(): ReactElement | null {
      const data = ('data' in expirationData) ? expirationData.data as ExpirationData[] : undefined;
      if (data) {
         const rowList = data.map((row) => [`${row.id}`, row.product, row.expirationDate]);
         return <Table headerList={['Id', 'Product', 'Expiration Date']} rowList={rowList} />;
      }
      return null;
   }


   return (
      <>
         <h2>Upcoming Expiration Dates</h2>
         <div className="counter-container">
            <Counter
               value={dayLimit}
               setValue={setDayLimit}
               minimum={1}
               maximum={14}
               suffix="Days"
            />
         </div>
         { generateTable() }
      </>
   );
}


export { ExpirationDateOverview };
