import React, { ReactElement, useState, useEffect } from 'react';
import { Counter } from '../../base-components/counter/Counter';
import { Table } from '../../base-components/table/Table';
import { fetchData, getPageId } from '../../../utility/fetchServerData';
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


   function fetchExpirationData(): void {
      fetchData<ExpirationData>(`/api/${getPageId()}/expirationDateOverview/${dayLimit}`, setExpirationData);
   }


   useEffect(fetchExpirationData, []);
   useEffect(fetchExpirationData, [dayLimit]);


   function generateExpirationDateTable(): ReactElement | null {
      const isDataRenderable = expirationData && expirationData.data;
      if (isDataRenderable) {
         const headerList = ['Id', 'Product', 'Expiration Date'];
         const rowList = expirationData.data.map(
            (record) => [`${record.id}`, record.product, new Date(record.expirationDate).toLocaleDateString('de-DE')]
         );
         return <Table headerList={headerList} rowList={rowList} />;
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
               maximum={30}
               suffix="Days"
            />
         </div>
         <div className="expiration-date-table">
            { generateExpirationDateTable() }
         </div>
      </>
   );
}


export { ExpirationDateOverview };
