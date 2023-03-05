import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { PreviewConsumedItem } from '../../../tsDataTypes/tsTypeGroceryItemConsume';


type ResponseType = {
   data: PreviewConsumedItem
};


function parseResultSet(data: PreviewConsumedItem): ResponseType {
   return { data };
}


async function handleInformationForIdRequest(
   request: Request,
   dbConnection: PoolConnection,
   argumentList: string[]
): Promise<ResponseType> {

   const id = argumentList[0];
   let resultSet: PreviewConsumedItem[];

   resultSet = await dbConnection.query(
      `select s.id , p.name as productName, concat(p.weight, m.unitSymbol) as amount, s.expirationDate
      from 
      (select * from Supply where consumptionDate is null and id = ?) as s
      inner join Products as p on s.productId = p.id
      inner join MeasurementUnits as m on p.measurementUnitId = m.id;`,
      [id]
   );

   resultSet = resultSet.slice();
   return parseResultSet(resultSet[0]);
}


export { handleInformationForIdRequest };
