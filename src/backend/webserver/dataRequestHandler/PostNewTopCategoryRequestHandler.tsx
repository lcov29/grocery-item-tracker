import { Request } from 'express';
import { PoolConnection } from 'mariadb';


async function handleNewTopCategoryPostRequest(request: Request, dbConnection: PoolConnection):
Promise<void> {
   const categoryName: string = request.body?.category;
   try {
      const resultSet = await dbConnection.query(
         'Insert into Categories (name) values (?)',
         [categoryName]
      );
      console.log(resultSet);
   } catch (error) {
      console.log(error);
   }
}


export { handleNewTopCategoryPostRequest };
