import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { DistributorNameList } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleDistributorNameListRequest(request: Request, dbConnection: PoolConnection):
Promise<DistributorNameList[]> {
   const resultSet: DistributorNameList[] = await dbConnection.query(
      'select name from Distributor order by name asc;'
   );
   return resultSet.slice();
}


export { handleDistributorNameListRequest };
