import React, { ReactElement } from 'react';
import { AddedItemReceiptData } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { parseDatabaseDate } from '../../../../../utility/parseDate';
import { Table } from '../../../../base-components/table/Table';


type Props = {
   addedItemsReceiptDataList: AddedItemReceiptData[]
};


function AddedItemsReceipt(props: Props): ReactElement {
   const { addedItemsReceiptDataList } = props;


   function buildRowList(): string[][] {
      const output = addedItemsReceiptDataList.map((item) => [
         item.id,
         item.productName,
         item.distributor,
         parseDatabaseDate(item.expirationDate)
      ]);
      return output;
   }


   return (
      <>
         <h2>Added Grocery Items</h2>
         <p>Successfully added the following items to the supply.</p>
         <p>
            Please mark the physical items with the assigned id.
            This id is used to consume specific items of your supply.
         </p>
         <Table
            headerList={['Id', 'Product', 'Distributor', 'Expiration Date']}
            rowList={buildRowList()}
         />
      </>
   );
}


export { AddedItemsReceipt };
