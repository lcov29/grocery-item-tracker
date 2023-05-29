import React, { ReactElement } from 'react';
import { AddedItemReceiptData } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { parseDatabaseDate } from '../../../../../utility/dateFunctions/dateFunctions';
import { Table } from '../../../../base-components/table/Table';
import idAddIcon from '../../../../../icons/idAddIcon.svg';
import './addedItemsReceipt.css';


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
         parseDatabaseDate(item.buyDate),
         parseDatabaseDate(item.expirationDate)
      ]);
      return output;
   }


   return (
      <>
         <h2>Sucessfully Added Grocery Items</h2>
         <div className="added-items-receipt-info-container">
            <img
               src={idAddIcon}
               alt="Tag items with id"
            />
            <div>
               Tag your items with the assigned Ids below.
               <br />
               <br />
               The Ids are later required to consume items.
            </div>
         </div>
         <div className="added-items-receipt-table-container">
            <Table
               headerList={['Id', 'Product', 'Distributor', 'Buy Date', 'Expiration Date']}
               rowList={buildRowList()}
            />
         </div>
      </>
   );
}


export { AddedItemsReceipt };
