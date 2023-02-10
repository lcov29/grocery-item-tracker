import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ExpirationDateDatabaseRecord, ExpirationDateFrontendData } from '../../../tsDataTypes/tsTypeExpirationDateOverview';


function parseResultSet(data: ExpirationDateDatabaseRecord[]): ExpirationDateFrontendData {
   return { data };
}


async function handleExpirationDateRequest(
   request: Request,
   dbConnection: PoolConnection,
   argumentList: string[]
): Promise<ExpirationDateFrontendData> {

   const dayLimit = argumentList[0];

   let resultSet: ExpirationDateDatabaseRecord[];
   resultSet = await dbConnection.query(
      `select * 
      from UpcomingExpirationDates
      where datediff(expirationDate, now()) <= ?;`,
      [dayLimit]
   );

   resultSet = resultSet.slice();
   console.log(resultSet);
   return parseResultSet(resultSet);
}


export { handleExpirationDateRequest };
