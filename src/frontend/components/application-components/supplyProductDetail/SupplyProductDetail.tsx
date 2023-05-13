/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useEffect, useState } from 'react';
import { SearchBar } from '../../base-components/searchBar/SearchBar';
import { fetchData } from '../../../utility/fetchServerData';
import { ProductInSupplyDatabaseRecord, SupplyListDatabaseRecord } from '../../../../tsDataTypes/tsTypesGrocerySupplyOverviewHome';


type Props = {
   currentProduct: ProductInSupplyDatabaseRecord | undefined,
   setCurrentProduct: (e: ProductInSupplyDatabaseRecord) => void
};


function SupplyProductDetail(props: Props): ReactElement {
   const { currentProduct, setCurrentProduct } = props;
   const [productList, setProductList] = useState<ProductInSupplyDatabaseRecord[]>([]);
   const [currentProductData, setCurrentProductData] = useState<SupplyListDatabaseRecord[]>([]);


   useEffect(() => {
      const route = '/api/grocerySupplyOverview/productList';
      fetchData<ProductInSupplyDatabaseRecord[]>(route, setProductList);
   }, []);


   useEffect(() => {
      if (currentProduct) {
         const route = `/api/grocerySupplyOverview/productData/${currentProduct.id}`;
         fetchData<SupplyListDatabaseRecord[]>(route, setCurrentProductData);
      }
   }, [currentProduct]);


   function setSearchedProduct(name: string) {
      let product: ProductInSupplyDatabaseRecord | undefined;
      if (productList) {
         product = productList.find((element) => element.name === name);
      }
      if (product) {
         setCurrentProduct(product);
      }
   }


   function buildProductNameList(productListData: ProductInSupplyDatabaseRecord[]): string[] {
      return productListData.map((product) => product.name);
   }


   function generateBreadcrumb(): ReactElement | null {
      const isRenderable = currentProductData && currentProductData.length > 0;
      if (isRenderable) {
         const product = currentProductData[0];
         return (
            <p>
               {`${product.topcategory} > ${product.subcategory} > `}
               <b>{product.product}</b>
            </p>
         );
      }
      return null;
   }


   return (
      <>
         <div id="supply-product-detail-header">
            <h2>Product Supply</h2>
            <SearchBar
               id="supply-product-detail-searchbar"
               placeholderText="Product"
               optionList={buildProductNameList(productList)}
               action={setSearchedProduct}
            />
         </div>
         {generateBreadcrumb()}
      </>
   );

}


export { SupplyProductDetail };
