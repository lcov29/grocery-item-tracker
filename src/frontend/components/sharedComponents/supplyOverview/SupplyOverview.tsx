import React, { ReactElement, useState, useEffect } from 'react';
import { fetchData } from '../../../utility/fetchServerData';
import { Category } from '../../base-components/category/Category';
import { Table } from '../../base-components/table/Table';
import {
   ProductSupplyOverview,
   SubCategory,
   TopCategory,
   SupplyOverviewFrontendData
} from '../../../../tsDataTypes/tsTypesGrocerySupplyOverview';


type Props = {
   handleRowClick?: (key: string) => void
};


function SupplyOverview(props: Props): ReactElement | null {
   const { handleRowClick } = props;
   const [supplyOverviewData, setSupplyOverviewData] = useState<SupplyOverviewFrontendData>();


   useEffect(() => {
      fetchData<SupplyOverviewFrontendData>('/api/supplyOverview', setSupplyOverviewData);
   }, []);


   function renderProductTable(productList: ProductSupplyOverview[] | undefined):
   ReactElement[] | [] {
      if (productList) {
         const headerList = ['Product', 'Amount'];
         const rowList = productList.map((product) => [product.name, `${product.total}`]);
         const keyList = productList.map((product) => product.name);

         return [
            <Table
               headerList={headerList}
               rowList={rowList}
               keyList={keyList}
               key={1}
               handleRowClick={handleRowClick}
            />
         ];
      }
      return [];
   }


   function renderSubCategory(subCategory: SubCategory, key: number): ReactElement {
      return (
         <Category
            name={subCategory.name}
            additionalText={`${subCategory.total} Items`}
            contentList={renderProductTable(subCategory.productList)}
            isContentLevel
            key={key}
         />
      );
   }


   function renderTopCategory(topCategory: TopCategory, key: number): ReactElement {
      let contentList: ReactElement[] | [] = [];
      if (topCategory.subCategoryList) {
         contentList = topCategory.subCategoryList.map(
            (subcategory, index) => renderSubCategory(subcategory, index)
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


   function renderGrocerySupplyOverview(): ReactElement | null {
      const isDataRenderable = supplyOverviewData && supplyOverviewData.data;
      if (isDataRenderable) {
         return (
            <>
               {
                  supplyOverviewData.data.map(
                     (topCategory, index) => renderTopCategory(topCategory, index)
                  )
               }
            </>
         );
      }
      return null;
   }


   return (
      <>
         <h2>Supply Overview</h2>
         { renderGrocerySupplyOverview() }
      </>
   );
}


export { SupplyOverview };
