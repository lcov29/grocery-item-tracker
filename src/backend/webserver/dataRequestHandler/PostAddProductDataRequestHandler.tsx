import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { CategoryData, MeasurementData } from '../../../tsDataTypes/tsTypesGroceryItemAdd';


async function handleAddNewProductPostRequest(request: Request, dbConnection: PoolConnection):
Promise<any> {
   try {
      const productCategory: CategoryData[] = await dbConnection.query(
         'select id from Categories where name = ?;',
         [request.body?.subcategoryName]
      );
      const categoryId = productCategory[0].id;

      const measurementUnit: MeasurementData[] = await dbConnection.query(
         'select id from MeasurementUnits where unitSymbol = ?;',
         [request.body?.unit]
      );
      const measurementUnitId = measurementUnit[0].id;

      const resultSet = await dbConnection.query(
         'Insert into Products (categoryId, measurementUnitId, weight, name) values (?, ?, ?, ?);',
         [categoryId, measurementUnitId, request.body?.weight, request.body?.productName]
      );
      return { payload: resultSet };
   } catch (error) {
      return { payload: error };
   }
}


export { handleAddNewProductPostRequest };
