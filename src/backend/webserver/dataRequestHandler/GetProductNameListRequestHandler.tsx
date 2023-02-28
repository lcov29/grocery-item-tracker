import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ProductNameListData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleProductNameListRequest(request: Request, dbConnection: PoolConnection):
Promise<ProductNameListData[]> {
   const resultSet: ProductNameListData[] = await dbConnection.query(
      'select name from Products order by name asc;'
   );
   return resultSet.slice();
}


export { handleProductNameListRequest };
