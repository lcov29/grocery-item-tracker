import React, { ReactElement, useState } from 'react';
import { SupplyOverview } from '../../application-components/supplyOverview/SupplyOverview';
import { SupplyProductDetail } from '../../application-components/supplyProductDetail/SupplyProductDetail';
import { ProductInSupplyDatabaseRecord } from '../../../../tsDataTypes/tsTypesGrocerySupplyOverview';
import './grocerySupplyOverview.css';


function GrocerySupplyOverview(): ReactElement {
   const [currentProduct, setCurrentProduct] = useState<ProductInSupplyDatabaseRecord>();

   return (
      <main id="grocery-supply-overview-container-main">
         <div className="grocery-supply-overview-container">
            <SupplyOverview />
         </div>
         <div className="grocery-supply-overview-container">
            <SupplyProductDetail
               currentProduct={currentProduct}
               setCurrentProduct={setCurrentProduct}
            />
         </div>
      </main>
   );
}


export { GrocerySupplyOverview };
