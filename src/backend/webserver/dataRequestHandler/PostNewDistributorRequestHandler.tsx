import { Request } from 'express';
import { PoolConnection } from 'mariadb';


async function handleNewDistributorPostRequest(request: Request, dbConnection: PoolConnection):
Promise<void> {
   try {
      const distributor = request.body?.distributor;
      let resultSet: { id: string }[] = await dbConnection.query(
         'select id from Distributor where name = ?;',
         [distributor]
      );

      const isNewDistributor = resultSet.length === 0;
      if (isNewDistributor) {
         resultSet = await dbConnection.query(
            'insert into Distributor (name) values (?)',
            [distributor]
         );
         console.log(resultSet);
      }
   } catch (error) {
      console.log(error);
   }
}


export { handleNewDistributorPostRequest };
