import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { CategoryData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleCategoryDataRequest(request: Request, dbConnection: PoolConnection):
Promise<CategoryData[]> {
   const resultSet: CategoryData[] = await dbConnection.query('select * from Categories;');
   return resultSet.slice();
}


export { handleCategoryDataRequest };
