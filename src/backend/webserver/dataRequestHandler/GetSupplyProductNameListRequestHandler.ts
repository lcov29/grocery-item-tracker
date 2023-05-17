import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ProductListDatabaseRecord } from '../../../tsDataTypes/tsTypesGrocerySupplyOverview';


async function handleSupplyProductNameListRequest(request: Request, dbConnection: PoolConnection):
Promise<ProductListDatabaseRecord[]> {
   const resultSet: ProductListDatabaseRecord[] = await dbConnection.query(
      'select * from ProductsInSupply order by name asc;'
   );
   return resultSet.slice();
}


export { handleSupplyProductNameListRequest };
