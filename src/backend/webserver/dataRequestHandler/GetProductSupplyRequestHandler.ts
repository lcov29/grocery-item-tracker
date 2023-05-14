import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { SupplyListDatabaseRecord } from '../../../tsDataTypes/tsTypesGrocerySupply';


async function handleProductSupplyRequest(
   request: Request,
   dbConnection: PoolConnection,
   argumentList: string[]
): Promise<SupplyListDatabaseRecord[]> {

   const productId = argumentList[0];
   const resultSet: SupplyListDatabaseRecord[] = await dbConnection.query(
      `select * 
      from GrocerySupplyList 
      where product = (select name from Products where id = ?)
      order by expirationDate asc;`,
      [productId]
   );
   return resultSet.slice();
}


export { handleProductSupplyRequest };
