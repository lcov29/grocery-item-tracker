/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useEffect, useState } from 'react';
import { SupplyOverview } from '../../sharedComponents/supplyOverview/SupplyOverview';
import { SupplyProductDetail } from '../../application-components/supplyProductDetail/SupplyProductDetail';
import { ProductListDatabaseRecord } from '../../../../tsDataTypes/tsTypesGrocerySupplyOverview';
import { fetchData } from '../../../utility/fetchServerData';
import './grocerySupplyOverview.css';


function GrocerySupplyOverview(): ReactElement {
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
            <SupplyOverview handleRowClick={handleSupplyOverviewRowListClick} />
         </div>
         <div className="grocery-supply-overview-container">
            <SupplyProductDetail
               productList={productList}
               currentProduct={currentProduct}
               setCurrentProduct={setCurrentProduct}
            />
         </div>
      </main>
   );
}


export { GrocerySupplyOverview };
