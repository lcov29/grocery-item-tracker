import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { CategoryData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleCategoryDataRequest(request: Request, dbConnection: PoolConnection):
Promise<CategoryData[]> {
   let resultSet: CategoryData[] = await dbConnection.query('select * from Categories;');
   console.log(resultSet);
   resultSet = resultSet.slice();
   return resultSet;
}


export { handleCategoryDataRequest };
