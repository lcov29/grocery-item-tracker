import React, { ReactElement, useState, useEffect } from 'react';
import { fetchData, getPageId } from '../../../utility/fetchServerData';
import { Category } from '../../base-components/category/Category';
import { Table } from '../../base-components/table/Table';


type ProductData = {
   name: string,
   total: number,
   minimum?: number
};


type SubCategory = {
   name: string,
   total: number,
   minimum?: number,
   productList?: ProductData[]
};


type TopCategory = {
   name: string,
   total: number,
   minimum?: number,
   subCategoryList?: SubCategory[]
};


function generateProductTable(productList: ProductData[] | undefined): ReactElement[] | [] {
   if (productList) {
      const headerList = ['Product', 'Amount'];
      const rowList: string[][] = [];
      productList.forEach((product) => rowList.push([`${product.name}`, `${product.total}`]));
      return [<Table headerList={headerList} rowList={rowList} key={1} />];
   }
   return [];
}


function generateSubCategory(subCategory: SubCategory, key: number): ReactElement {
   return (
      <Category
         name={subCategory.name}
         additionalText={`${subCategory.total} Items`}
         contentList={generateProductTable(subCategory.productList)}
         key={key}
      />
   );
}


function generateTopCategory(topCategory: TopCategory, key: number): ReactElement {
   let contentList: ReactElement[] | [] = [];
   if (topCategory.subCategoryList) {
      contentList = topCategory.subCategoryList.map(
         (subcategory, index) => generateSubCategory(subcategory, index)
      );
   }

   return (
      <Category
         name={topCategory.name}
         additionalText={`${topCategory.total} Items`}
         contentList={contentList}
         isTopLevel
         key={key}
      />
   );
}


function GrocerySupplyOverviewHome(): ReactElement | null {
   const [supplyOverviewData, setSupplyOverviewData] = useState({});


   useEffect(() => {
      fetchData(`/${getPageId()}/data/supplyOverview`, setSupplyOverviewData);
   }, []);


   function generateGrocerySupplyOverview(): ReactElement | null {
      const data = ('data' in supplyOverviewData) ? supplyOverviewData.data as TopCategory[] : undefined;
      if (data) {
         return (
            <>
               { data.map((topCategory, index) => generateTopCategory(topCategory, index)) }
            </>
         );
      }
      return null;
   }


   return (
      <>
         <h2>Grocery Item Supply</h2>
         { generateGrocerySupplyOverview() }
      </>
   );
}


export { GrocerySupplyOverviewHome, TopCategory };
