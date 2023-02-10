import { Request } from 'express';
import { PoolConnection } from 'mariadb';


type SupplyOverviewRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   amount: string
};

type CategoryName = 'topcategory' | 'subcategory';


function getUniquePropertyValueList(resultSet: SupplyOverviewRecord[], categoryName: CategoryName):
string[] {
   const topCategoryList = [] as string[];

   const uniqueValueFn = (element: SupplyOverviewRecord) => {
      const isCategoryInList = topCategoryList.includes(element[categoryName]);
      if (!isCategoryInList) {
         topCategoryList.push(element[categoryName]);
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


function parseResultSet(resultSet: SupplyOverviewRecord[]): { data: any[] } {
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

   return { data: parsedTopCategoryList };
}


async function handleSupplyOverviewHomeRequest(request: Request, dbConnection: PoolConnection):
Promise<{ data: any[] }> {

   let resultSet: SupplyOverviewRecord[] = await dbConnection.query('select * from GrocerySupplyOverview;');
   resultSet = resultSet.slice();
   return parseResultSet(resultSet);
}


export { handleSupplyOverviewHomeRequest };
