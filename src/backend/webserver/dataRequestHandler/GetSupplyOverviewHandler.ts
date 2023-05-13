import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import {
   SupplyOverviewDatabaseRecord,
   CategoryName,
   SupplyOverviewFrontendData,
   TopCategory,
   SubCategory,
   ProductSupplyOverview
} from '../../../tsDataTypes/tsTypesGrocerySupplyOverviewHome';


function getUniquePropertyValueList(
   resultSet: SupplyOverviewDatabaseRecord[],
   categoryName: CategoryName
): string[] {

   const topCategoryList = [] as string[];

   const uniqueValueFn = (element: SupplyOverviewDatabaseRecord) => {
      const isCategoryInList = topCategoryList.includes(element[categoryName]);
      if (!isCategoryInList) {
         topCategoryList.push(element[categoryName]);
      }
   };

   resultSet.forEach(uniqueValueFn);
   return topCategoryList;
}


function splitResultSetByTopCategory(
   resultSet: SupplyOverviewDatabaseRecord[]
): SupplyOverviewDatabaseRecord[][] {

   const topCategoryNameList = getUniquePropertyValueList(resultSet, 'topcategory');
   const outputList = [] as SupplyOverviewDatabaseRecord[][];

   topCategoryNameList.forEach((topCategoryName) => {
      const topCategoryRecordList = resultSet.filter(
         (record) => record.topcategory === topCategoryName
      );
      outputList.push(topCategoryRecordList);
   });

   return outputList;
}


function splitResultSetBySubCategory(topCategoryRecordSet: SupplyOverviewDatabaseRecord[]):
SupplyOverviewDatabaseRecord[][] {

   const outputList = [] as SupplyOverviewDatabaseRecord[][];
   const subCategoryNameList = getUniquePropertyValueList(topCategoryRecordSet, 'subcategory');

   subCategoryNameList.forEach((subCategoryName) => {
      const subCategoryRecordList = topCategoryRecordSet.filter(
         (record) => record.subcategory === subCategoryName
      );
      outputList.push(subCategoryRecordList);
   });

   return outputList;
}


function parseResultSet(resultSet: SupplyOverviewDatabaseRecord[]): SupplyOverviewFrontendData {
   const parsedTopCategoryList: TopCategory[] = [];
   const topCategoryList = splitResultSetByTopCategory(resultSet);

   topCategoryList.forEach((topCategory) => {

      const topCategoryObj = {
         name: topCategory[0].topcategory,
         total: topCategory.reduce((sum, curVal) => sum + parseInt(curVal.amount, 10), 0),
         subCategoryList: [] as SubCategory[]
      };

      parsedTopCategoryList.push(topCategoryObj);


      const parsedSubCategoryList: SubCategory[] = [];
      const subCategoryList = splitResultSetBySubCategory(topCategory);

      subCategoryList.forEach((subCategory) => {

         const subCategoryObj = {
            name: subCategory[0].subcategory,
            total: subCategory.reduce((sum, curVal) => sum + parseInt(curVal.amount, 10), 0),
            productList: [] as ProductSupplyOverview[]
         };

         const parsedProductList: ProductSupplyOverview[] = subCategory.map((element) => (
            { name: element.product, total: parseInt(element.amount, 10) }
         ));

         subCategoryObj.productList = parsedProductList;

         parsedSubCategoryList.push(subCategoryObj);

         topCategoryObj.subCategoryList = parsedSubCategoryList;

      });

   });

   return { data: parsedTopCategoryList };
}


async function handleSupplyOverviewRequest(request: Request, dbConnection: PoolConnection):
Promise<SupplyOverviewFrontendData> {
   let resultSet: SupplyOverviewDatabaseRecord[];
   resultSet = await dbConnection.query('select * from GrocerySupplyOverview;');
   resultSet = resultSet.slice();
   return parseResultSet(resultSet);
}


export { handleSupplyOverviewRequest };
