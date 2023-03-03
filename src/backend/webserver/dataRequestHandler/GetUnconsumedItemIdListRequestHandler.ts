import { Request } from 'express';
import { PoolConnection } from 'mariadb';


async function handleUnconsumedItemIdListRequest(request: Request, dbConnection: PoolConnection):
Promise<number[]> {
   const resultSet: number[] = await dbConnection.query(
      'select id from Supply where consumptionDate is null order by id asc;'
   );
   return resultSet.slice();
}


export { handleUnconsumedItemIdListRequest };
