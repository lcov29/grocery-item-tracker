/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useEffect, useState } from 'react';
import { Table } from '../../base-components/table/Table';
import { SearchBar } from '../../base-components/searchBar/SearchBar';
import { fetchData } from '../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../utility/parseDate';
import { ProductListDatabaseRecord, SupplyListDatabaseRecord } from '../../../../tsDataTypes/tsTypesGrocerySupplyOverview';
import './supplyProductDetail.css';


type Props = {
   currentProduct: ProductListDatabaseRecord | undefined,
   setCurrentProduct: (e: ProductListDatabaseRecord) => void
};


function SupplyProductDetail(props: Props): ReactElement {
   const { currentProduct, setCurrentProduct } = props;
   const [productList, setProductList] = useState<ProductListDatabaseRecord[]>([]);
   const [currentProductData, setCurrentProductData] = useState<SupplyListDatabaseRecord[]>([]);


   useEffect(() => {
      const route = '/api/grocerySupplyOverview/productList';
      fetchData<ProductListDatabaseRecord[]>(route, setProductList);
   }, []);


   useEffect(() => {
      if (currentProduct) {
         const route = `/api/grocerySupplyOverview/productData/${currentProduct.id}`;
         fetchData<SupplyListDatabaseRecord[]>(route, setCurrentProductData);
      }
   }, [currentProduct]);


   function setSearchedProduct(name: string) {
      let product: ProductListDatabaseRecord | undefined;
      if (productList) {
         product = productList.find((element) => element.name === name);
      }
      if (product) {
         setCurrentProduct(product);
      }
   }


   function buildProductNameList(productListData: ProductListDatabaseRecord[]): string[] {
      return productListData.map((product) => product.name);
   }


   function isRenderable(): boolean {
      return currentProductData && currentProductData.length > 0;
   }


   function buildBreadcrumb(): ReactElement | null {
      if (isRenderable()) {
         const product = currentProductData[0];
         return (
            <p id="supply-product-detail-breadcrumb">
               {`${product.topcategory} > ${product.subcategory} > `}
               <b>{product.product}</b>
            </p>
         );
      }
      return null;
   }


   function buildProductInformation(): ReactElement | null {
      if (isRenderable()) {
         const item = currentProductData[0];
         return (
            <p>{`${currentProductData.length} items of ${item.product} (${item.weight}):`}</p>
         );
      }
      return null;
   }


   function buildSupplyTable(): ReactElement | null {
      if (isRenderable()) {
         const headerList = ['Id', 'Distributor', 'Buy Date', 'Expiration Date'];
         const rowList: string[][] = currentProductData.map(
            (item) => [
               item.id.toString(),
               item.distributor,
               parseDatabaseDate(item.buyDate),
               parseDatabaseDate(item.expirationDate)
            ]
         );
         return <Table headerList={headerList} rowList={rowList} key={1} />;
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
         {buildBreadcrumb()}
         {buildProductInformation()}
         {buildSupplyTable()}
      </>
   );

}


export { SupplyProductDetail };
