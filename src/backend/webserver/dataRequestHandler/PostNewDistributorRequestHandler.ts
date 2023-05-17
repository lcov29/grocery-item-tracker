import { Request } from 'express';
import { PoolConnection } from 'mariadb';


async function handleNewDistributorPostRequest(request: Request, dbConnection: PoolConnection):
Promise<{ ok: number }> {
   try {
      const distributor = request.body?.distributor;
      let resultSet = await dbConnection.query(
         'select id from Distributor where name = ?;',
         [distributor]
      );

      let statusCode = 500;
      const isNewDistributor = resultSet.length === 0;
      if (isNewDistributor) {
         resultSet = await dbConnection.query(
            'insert into Distributor (name) values (?)',
            [distributor]
         );
         console.log(resultSet);

         const isInsertionSuccessful = resultSet.affectedRows === 1;
         statusCode = (isInsertionSuccessful) ? 200 : 500;
      }

      return { ok: statusCode };
   } catch (error) {
      console.log(error);
      return { ok: 500 };
   }
}


export { handleNewDistributorPostRequest };
