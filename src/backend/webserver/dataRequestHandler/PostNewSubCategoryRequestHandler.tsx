import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { CategoryData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleNewSubCategoryPostRequest(request: Request, dbConnection: PoolConnection):
Promise<void> {
   try {
      const topCategory: CategoryData[] = await dbConnection.query(
         'select id from Categories where name = ?;',
         [request.body?.category]
      );

      const topCategoryId = topCategory[0].id;

      const resultSet = await dbConnection.query(
         'Insert into Categories (name, parentCategoryId) values (?, ?)',
         [request.body?.subCategory, topCategoryId]
      );
      console.log(resultSet);
   } catch (error) {
      console.log(error);
   }
}


export { handleNewSubCategoryPostRequest };
