import { Request } from 'express';
import { PoolConnection } from 'mariadb';
import { SupplyListDatabaseRecord, PropertyName, ItemData, Product, SubCategory, TopCategory, SupplyListFrontendData } from '../../../tsDataTypes/tsTypesGrocerySupply';


function getUniquePropertyValueList(
   dataList: SupplyListDatabaseRecord[],
   propertyName: PropertyName
): string[] {
   const propertyValueList: string[] = [];

   const getUniqueValueList = (element: SupplyListDatabaseRecord) => {
      const propertyValue = element[propertyName];
      const isNewPropertyValue = !propertyValueList.includes(propertyValue);

      if (isNewPropertyValue) {
         propertyValueList.push(propertyValue);
      }
   };

   dataList.forEach(getUniqueValueList);
   return propertyValueList;
}



function splitResultSetByTopCategory(
   resultSet: SupplyListDatabaseRecord[]
): SupplyListDatabaseRecord[][] {

   const topCategoryNameList = getUniquePropertyValueList(resultSet, 'topcategory');
   const outputList = [] as SupplyListDatabaseRecord[][];

   topCategoryNameList.forEach((topCategoryName) => {
      const topCategoryRecordList = resultSet.filter(
         (record) => record.topcategory === topCategoryName
      );
      outputList.push(topCategoryRecordList);
   });

   return outputList;
}



function splitResultSetBySubCategory(topCategoryRecordSet: SupplyListDatabaseRecord[]):
SupplyListDatabaseRecord[][] {

   const outputList = [] as SupplyListDatabaseRecord[][];
   const subCategoryNameList = getUniquePropertyValueList(topCategoryRecordSet, 'subcategory');

   subCategoryNameList.forEach((subCategoryName) => {
      const subCategoryRecordList = topCategoryRecordSet.filter(
         (record) => record.subcategory === subCategoryName
      );
      outputList.push(subCategoryRecordList);
   });

   return outputList;
}



function splitResultSetByProduct(subCategoryRecordSet: SupplyListDatabaseRecord[]):
SupplyListDatabaseRecord[][] {
   const outputList = [] as SupplyListDatabaseRecord[][];
   const productNameList = getUniquePropertyValueList(subCategoryRecordSet, 'product');

   productNameList.forEach((productName) => {
      const productRecordList = subCategoryRecordSet.filter(
         (record) => record.product === productName
      );
      outputList.push(productRecordList);
   });

   return outputList;
}



function parseResultSet(resultSet: SupplyListDatabaseRecord[]): SupplyListFrontendData {
   const parsedTopCategoryList: TopCategory[] = [];
   const topCategoryList = splitResultSetByTopCategory(resultSet);


   topCategoryList.forEach((topCategory) => {

      const topCategoryObj = {
         name: topCategory[0].topcategory,
         total: topCategory.length,
         subCategoryList: [] as SubCategory[]
      };

      parsedTopCategoryList.push(topCategoryObj);


      const parsedSubCategoryList: SubCategory[] = [];
      const subCategoryList = splitResultSetBySubCategory(topCategory);

      subCategoryList.forEach((subCategory) => {

         const subCategoryObj = {
            name: subCategory[0].subcategory,
            total: subCategory.length,
            productList: [] as Product[]
         };

         parsedSubCategoryList.push(subCategoryObj);


         const parsedProductList: Product[] = [];
         const productList = splitResultSetByProduct(subCategory);

         productList.forEach((product) => {

            const productObj = {
               name: product[0].product,
               total: product.length,
               itemList: [] as ItemData[]
            };

            const parsedItemList: ItemData[] = product.map((element) => (
               {
                  id: element.id,
                  buyDate: element.buyDate,
                  distributor: element.distributor,
                  expirationDate: element.expirationDate
               }
            ));

            productObj.itemList = parsedItemList;
            parsedProductList.push(productObj);

         });

         subCategoryObj.productList = parsedProductList;

      });

      topCategoryObj.subCategoryList = parsedSubCategoryList;

   });

   return { data: parsedTopCategoryList };
}



async function handleSupplyListRequest(request: Request, dbConnection: PoolConnection):
Promise<SupplyListFrontendData> {
   let resultSet: SupplyListDatabaseRecord[];
   resultSet = await dbConnection.query('select * from GrocerySupplyList;');
   resultSet = resultSet.slice();
   return parseResultSet(resultSet);
}



export { handleSupplyListRequest };
