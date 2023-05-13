import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ProductInSupplyDatabaseRecord } from '../../../tsDataTypes/tsTypesGrocerySupplyOverviewHome';


async function handleSupplyProductNameListRequest(request: Request, dbConnection: PoolConnection):
Promise<ProductInSupplyDatabaseRecord[]> {
   const resultSet: ProductInSupplyDatabaseRecord[] = await dbConnection.query(
      'select * from ProductsInSupply order by name asc;'
   );
   return resultSet.slice();
}


export { handleSupplyProductNameListRequest };
