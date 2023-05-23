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
      const route = '/api/grocerySupplyOverview/productList';
      fetchData<ProductListDatabaseRecord[]>(route, setProductList);
   }, []);


   function handleSupplyOverviewRowListClick(productName: string): void {
      const newProduct = productList.find((product) => product.name === productName);
      setCurrentProduct(newProduct);
   }


   return (
      <main id="grocery-supply-overview-container-main">
         <div className="grocery-supply-overview-container">
            <Overview handleRowClick={handleSupplyOverviewRowListClick} />
         </div>
         <div className="grocery-supply-overview-container">
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
