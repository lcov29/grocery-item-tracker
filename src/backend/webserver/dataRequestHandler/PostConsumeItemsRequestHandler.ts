import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ConsumeItemsFromSupplyResponse } from '../../../tsDataTypes/tsTypeGroceryItemConsume';


async function handleConsumeItemsPostRequest(request: Request, dbConnection: PoolConnection):
Promise<ConsumeItemsFromSupplyResponse> {
   try {
      const idListString: string[] = request.body?.idListString;

      idListString.forEach(async (element) => {
         await dbConnection.query(
            'update Supply set consumptionDate = curDate() where id = ?',
            [element]
         );
      });

      return { ok: 200 };
   } catch (error) {
      console.log(error);
      return { ok: 500 };
   }
}


export { handleConsumeItemsPostRequest };
