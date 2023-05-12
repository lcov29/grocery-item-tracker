import React, { ReactElement, useEffect, useState } from 'react';
import { Category } from '../../base-components/category/Category';
import { Table } from '../../base-components/table/Table';
import { SearchBar } from '../../base-components/searchBar/SearchBar';
import { ItemData, Product, SubCategory, TopCategory, SupplyListFrontendData } from '../../../../tsDataTypes/tsTypesGrocerySupply';
import { fetchData } from '../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../utility/parseDate';
import './supplyList.css';


function generateItemTable(itemList?: ItemData[]): ReactElement[] | [] {
   if (itemList) {
      const headerList = ['Id', 'Buy Date', 'Distributor', 'Expiration Date'];
      const rowList: string[][] = [];
      itemList.forEach(
         (item) => rowList.push(
            [
               item.id.toString(),
               parseDatabaseDate(item.buyDate),
               item.distributor,
               parseDatabaseDate(item.expirationDate)
            ]
         )
      );
      return [<Table headerList={headerList} rowList={rowList} key={1} />];
   }

   return [];
}


function generateProductCategory(product: Product, key: number): ReactElement {
   return (
      <Category
         name={product.name}
         additionalText={`${product.total} Items`}
         contentList={generateItemTable(product.itemList)}
         isContentLevel
         key={key}
      />
   );
}


function generateSubCategory(subCategory: SubCategory, key: number): ReactElement {
   let contentList: ReactElement[] | [] = [];
   if (subCategory.productList) {
      contentList = subCategory.productList.map(
         (product, index) => generateProductCategory(product, index)
      );
   }
   return (
      <Category
         name={subCategory.name}
         additionalText={`${subCategory.total} Items`}
         contentList={contentList}
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


function SupplyList(): ReactElement {
   const [supplyListData, setSupplyListData] = useState<SupplyListFrontendData>();


   useEffect(() => {
      fetchData('/api/GrocerySupplyList/supplyList', setSupplyListData);
   }, []);


   function generateSupplyList(): ReactElement | null {
      const isDataRenderable = supplyListData && supplyListData.data;
      if (isDataRenderable) {
         return (
            <>
               {
                  supplyListData.data.map(
                     (topCategory, index) => generateTopCategory(topCategory, index)
                  )
               }
            </>
         );
      }
      return null;
   }


   return (
      <div id="supply-overview-container">
         <div id="supply-overview-header">
            <h2>Supply Overview</h2>
            <SearchBar
               id="supply-overview-search-bar"
               placeholderText="Enter Text..."
               optionList={['Option 1', 'Option 2', 'Option 3']}
            />
         </div>
         { generateSupplyList() }
      </div>
   );

}


export { SupplyList };
