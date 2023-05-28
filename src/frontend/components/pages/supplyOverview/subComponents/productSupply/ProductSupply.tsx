/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useEffect, useState } from 'react';
import { Table } from '../../../../base-components/table/Table';
import { SearchBar } from '../../../../base-components/searchBar/SearchBar';
import { fetchData } from '../../../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../../../utility/parseDate/parseDate';
import { ProductListDatabaseRecord, SupplyListDatabaseRecord } from '../../../../../../tsDataTypes/tsTypesGrocerySupplyOverview';
import './productSupply.css';


type Props = {
   productList: ProductListDatabaseRecord[],
   currentProduct: ProductListDatabaseRecord | undefined,
   setCurrentProduct: (e: ProductListDatabaseRecord) => void
};


function ProductSupply(props: Props): ReactElement {
   const { productList, currentProduct, setCurrentProduct } = props;
   const [currentProductData, setCurrentProductData] = useState<SupplyListDatabaseRecord[]>([]);


   useEffect(() => {
      if (currentProduct) {
         const route = `/api/supplyOverview/get/productData/${currentProduct.id}`;
         fetchData<SupplyListDatabaseRecord[]>(route, setCurrentProductData);
      }
   }, [currentProduct]);


   function setSearchedProduct(name: string) {
      const product = productList.find((element) => element.name === name);
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


   function renderBreadcrumb(): ReactElement | null {
      if (isRenderable()) {
         const product = currentProductData[0];
         return (
            <p className="product-supply-breadcrumb">
               {`${product.topcategory} > ${product.subcategory} > `}
               <b>{product.product}</b>
            </p>
         );
      }
      return null;
   }


   function renderProductInformation(): ReactElement | null {
      if (isRenderable()) {
         const product = currentProductData[0];
         return (
            <p>{`${currentProductData.length} items of ${product.product} (${product.weight}):`}</p>
         );
      }
      return null;
   }


   function renderSupplyTable(): ReactElement | null {
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
         <div className="product-supply-header">
            <h2>Product Supply</h2>
            <SearchBar
               id="product-supply-searchbar"
               placeholderText="Product"
               optionList={buildProductNameList(productList)}
               action={setSearchedProduct}
            />
         </div>
         {renderBreadcrumb()}
         {renderProductInformation()}
         {renderSupplyTable()}
      </>
   );

}


export { ProductSupply };
