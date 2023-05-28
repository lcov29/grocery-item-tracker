import React, { ReactElement, useState, useEffect } from 'react';
import { fetchData } from '../../../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../../../utility/parseDate/parseDate';
import { Counter } from '../../../../base-components/counter/Counter';
import { Table } from '../../../../base-components/table/Table';
import './expirationDateOverview.css';


type ExpirationData = {
   data: {
      id: number,
      product: string,
      expirationDate: string
   }[]
};


function ExpirationDateOverview(): ReactElement {
   const [dayLimit, setDayLimit] = useState(7);
   const [expirationData, setExpirationData] = useState<ExpirationData>();


   useEffect(() => {
      const route = `/api/home/expirationDateOverview/get/${dayLimit}`;
      fetchData<ExpirationData>(route, setExpirationData);
   }, [dayLimit]);


   function renderExpirationDateTable(): ReactElement | null {
      const isDataRenderable = expirationData && expirationData.data;
      if (isDataRenderable) {
         const headerList = ['Id', 'Product', 'Expiration Date'];
         const rowList = expirationData.data.map(
            (record) => [`${record.id}`, record.product, parseDatabaseDate(record.expirationDate)]
         );
         return <Table headerList={headerList} rowList={rowList} />;
      }
      return null;
   }


   return (
      <>
         <div id="expiration-date-header">
            <h2>Upcoming Expiration Dates</h2>
            <Counter
               value={dayLimit}
               setValue={setDayLimit}
               minimum={1}
               maximum={30}
               suffix="Days"
            />
         </div>
         { renderExpirationDateTable() }
      </>
   );
}


export { ExpirationDateOverview };
