import { Request } from 'express';
import { PoolConnection } from 'mariadb';


async function handleNewTopCategoryPostRequest(request: Request, dbConnection: PoolConnection):
Promise<{ ok: number }> {
   const categoryName: string = request.body?.category;

   try {
      const resultSet = await dbConnection.query('Insert into Categories (name) values (?)', [categoryName]);
      const isInsertionSuccessful = resultSet.affectedRows === 1;
      const statusCode = (isInsertionSuccessful) ? 200 : 500;
      console.log(resultSet);

      return { ok: statusCode };
   } catch (error) {
      console.log(error);
      return { ok: 500 };
   }
}


export { handleNewTopCategoryPostRequest };
