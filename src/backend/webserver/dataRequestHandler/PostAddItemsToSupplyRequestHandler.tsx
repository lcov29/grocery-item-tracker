/* eslint-disable no-await-in-loop */
import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { GroceryItemData, AddedItemReceiptData, AddItemToSupplyResponse } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


function getCurrentDateString(): string {
   const date = new Date().toISOString();
   return date.replaceAll(/T[0-9:.]*Z/g, '');
}


async function handleAddItemsToSupplyPostRequest(request: Request, dbConnection: PoolConnection):
Promise<AddItemToSupplyResponse> {
   try {
      const groceryItemDataList = request.body?.data as GroceryItemData[];
      const responseData: AddedItemReceiptData[] = [];

      for (let j = 0; j < groceryItemDataList.length; j++) {

         const item = groceryItemDataList[j];

         const product: { id: number }[] = await dbConnection.query(
            'select id from Products where name = ?;',
            [item.productName]
         );

         const distributor: { id: number }[] = await dbConnection.query(
            'select id from Distributor where name = ?;',
            [item.distributor]
         );

         for (let i = 0; i < item.amount; i++) {
            const result = await dbConnection.query(
               `insert into Supply (productId, distributorId, price, buyDate, expirationDate)
               value (?, ?, ?, ?, ?);`,
               [
                  product[0].id,
                  distributor[0].id,
                  item.pricePerUnit,
                  getCurrentDateString(),
                  item.expirationDate
               ]
            );

            responseData.push({
               id: result.insertId.toString(),
               productName: item.productName,
               distributor: item.distributor,
               expirationDate: item.expirationDate
            });
         }
      }
      return { ok: 200, data: responseData };
   } catch (error) {
      console.log(error);
      return { ok: 500 };
   }
}


export { handleAddItemsToSupplyPostRequest };
