import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { ConsumeItemsFromSupplyResponse } from '../../../tsDataTypes/tsTypeGroceryItemConsume';


async function handleConsumeItemsPostRequest(request: Request, dbConnection: PoolConnection):
Promise<ConsumeItemsFromSupplyResponse> {
   try {
      const idList: number[] = request.body?.idList;
      if (!idList) { return { ok: 500 }; }

      await dbConnection.query('update Supply set consumptionDate = curDate() where id in (?)', [idList]);
      return { ok: 200 };
   } catch (error) {
      console.log(error);
      return { ok: 500 };
   }
}


export { handleConsumeItemsPostRequest };
