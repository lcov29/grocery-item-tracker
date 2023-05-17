import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { CategoryData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleNewSubCategoryPostRequest(request: Request, dbConnection: PoolConnection):
Promise<{ ok: number }> {
   try {
      const topCategory: CategoryData[] = await dbConnection.query(
         'select id from Categories where name = ?;',
         [request.body?.topCategory]
      );

      const topCategoryId = topCategory[0].id;

      const resultSet = await dbConnection.query(
         'Insert into Categories (name, parentCategoryId) values (?, ?)',
         [request.body?.subCategory, topCategoryId]
      );
      console.log(resultSet);

      const isInsertionSuccessful = resultSet.affectedRows === 1;
      const statusCode = (isInsertionSuccessful) ? 200 : 500;
      return { ok: statusCode };
   } catch (error) {
      return { ok: 500 };
   }
}


export { handleNewSubCategoryPostRequest };
