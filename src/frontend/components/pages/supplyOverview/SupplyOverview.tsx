/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useEffect, useState } from 'react';
import { SupplyOverview as Overview } from '../../sharedComponents/supplyOverview/SupplyOverview';
import { ProductSupply } from './subComponents/productSupply/ProductSupply';
import { ProductListDatabaseRecord } from '../../../../tsDataTypes/tsTypesGrocerySupplyOverview';
import { fetchData } from '../../../utility/fetchServerData';
import './supplyOverview.css';


function SupplyOverview(): ReactElement {
   const [productList, setProductList] = useState<ProductListDatabaseRecord[]>([]);
   const [currentProduct, setCurrentProduct] = useState<ProductListDatabaseRecord>();


   useEffect(() => {
      const route = '/api/supplyOverview/get/productList';
      fetchData<ProductListDatabaseRecord[]>(route, setProductList);
   }, []);


   function handleRowListClick(productName: string): void {
      const newProduct = productList.find((product) => product.name === productName);
      setCurrentProduct(newProduct);
   }


   return (
      <main className="supply-overview-container-main">
         <div className="supply-overview-container">
            <Overview handleRowClick={handleRowListClick} />
         </div>
         <div className="supply-overview-container">
            <ProductSupply
               productList={productList}
               currentProduct={currentProduct}
               setCurrentProduct={setCurrentProduct}
            />
         </div>
      </main>
   );
}


export { SupplyOverview };
