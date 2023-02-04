import React, { ReactElement } from 'react';
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


type GrocerySupplyOverviewHomeProps = {
   topCategoryList: TopCategory[] | undefined
};


function generateProductTable(productList: ProductData[] | undefined): ReactElement[] | [] {
   if (productList) {
      const rowList: string[][] = [];
      productList.forEach((product) => rowList.push([`${product.name}`, `${product.total}`]));
      return [<Table headerList={['Product', 'Amount']} rowList={rowList} key={1} />];
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


function GrocerySupplyOverviewHome(props: GrocerySupplyOverviewHomeProps): ReactElement | null {
   const { topCategoryList } = props;
   if (topCategoryList) {
      return (
         <>
            { topCategoryList.map((topCategory, index) => generateTopCategory(topCategory, index)) }
         </>
      );
   }
   return null;
}


export { GrocerySupplyOverviewHome, TopCategory };
