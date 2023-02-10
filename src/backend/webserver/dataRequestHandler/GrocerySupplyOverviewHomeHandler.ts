import { Request } from 'express';
import { PoolConnection } from 'mariadb';


type SupplyOverviewRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   amount: string
};

type PropertyName = 'topcategory' | 'subcategory';


function getUniquePropertyValueList(resultSet: SupplyOverviewRecord[], propertyName: PropertyName):
string[] {
   const topCategoryList = [] as string[];

   const uniqueValueFn = (element: SupplyOverviewRecord) => {
      const isCategoryInList = topCategoryList.includes(element[propertyName]);
      if (!isCategoryInList) {
         topCategoryList.push(element[propertyName]);
      }
   };

   resultSet.forEach(uniqueValueFn);
   return topCategoryList;
}


function splitResultSetByTopCategory(resultSet: SupplyOverviewRecord[]): SupplyOverviewRecord[][] {
   const topCategoryNameList = getUniquePropertyValueList(resultSet, 'topcategory');
   const outputList = [] as SupplyOverviewRecord[][];

   topCategoryNameList.forEach((topCategoryName) => {
      const topCategoryRecordList = resultSet.filter(
         (record) => record.topcategory === topCategoryName
      );
      outputList.push(topCategoryRecordList);
   });

   return outputList;
}


function splitResultSetBySubCategory(topCategoryRecordSet: SupplyOverviewRecord[]):
SupplyOverviewRecord[][] {

   const outputList = [] as SupplyOverviewRecord[][];
   const subCategoryNameList = getUniquePropertyValueList(topCategoryRecordSet, 'subcategory');

   subCategoryNameList.forEach((subCategoryName) => {
      const subCategoryRecordList = topCategoryRecordSet.filter(
         (record) => record.subcategory === subCategoryName
      );
      outputList.push(subCategoryRecordList);
   });

   return outputList;
}


function parseResultSet(resultSet: SupplyOverviewRecord[]): any[] {
   const parsedTopCategoryList = [];
   const topCategoryList = splitResultSetByTopCategory(resultSet);

   topCategoryList.forEach((topCategory) => {

      const topCategoryObj = {
         name: topCategory[0].topcategory,
         total: topCategory.reduce((sum, curVal) => sum + parseInt(curVal.amount, 10), 0),
         subCategoryList: [] as any[]
      };

      parsedTopCategoryList.push(topCategoryObj);


      const parsedSubCategoryList = [];
      const subCategoryList = splitResultSetBySubCategory(topCategory);

      subCategoryList.forEach((subCategory) => {

         const subCategoryObj = {
            name: subCategory[0].subcategory,
            total: subCategory.reduce((sum, curVal) => sum + parseInt(curVal.amount, 10), 0),
            productList: [] as any[]
         };

         const parsedProductList = subCategory.map((element) => (
            { name: element.product, total: element.amount }
         ));

         subCategoryObj.productList = parsedProductList;

         parsedSubCategoryList.push(subCategoryObj);

         topCategoryObj.subCategoryList = parsedSubCategoryList;

      });

   });

   return parsedTopCategoryList;
}


async function handleSupplyOverviewHomeRequest(request: Request, dbConnection: PoolConnection):
Promise<any[]> {

   let resultSet: SupplyOverviewRecord[] = await dbConnection.query('select * from GrocerySupplyOverview;');
   resultSet = resultSet.slice();
   resultSet = parseResultSet(resultSet);
   return resultSet;
}


export { handleSupplyOverviewHomeRequest };
