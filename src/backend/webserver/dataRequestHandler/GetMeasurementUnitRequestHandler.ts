import { Request } from 'express';
import { PoolConnection } from 'mariadb';


type MeasurementUnitData = {
   unitSymbol: string
};


async function handleMeasurementUnitRequest(request: Request, dbConnection: PoolConnection):
Promise<MeasurementUnitData[]> {
   const resultSet: MeasurementUnitData[] = await dbConnection.query(
      'select unitSymbol from MeasurementUnits order by unitSymbol asc;'
   );
   return resultSet.slice();
}


export { handleMeasurementUnitRequest };
