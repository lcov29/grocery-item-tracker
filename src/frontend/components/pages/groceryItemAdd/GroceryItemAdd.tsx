import React, { ReactElement, useState } from 'react';
import { GrocerySupplyAddItemDialog } from '../../application-components/grocerySupplyAddItemDialog/GrocerySupplyAddItemDialog';
import { ProductDataAddDialog } from '../../application-components/productDataAddDialog/ProductDataAddDialog';
import { ProductSelectionDialog } from '../../application-components/productSelectionDialog/ProductSelectionDialog';
import './groceryItemAdd.css';


type PageState = 'TopLevelState' | 'ItemAddState' | 'ProductInformationAddState';

type GroceryItemRecord = {
   productId: number,
   distributorId: number,
   price: number,
   buyDate: Date,
   expirationDate: Date
};


function GroceryItemAdd(): ReactElement {

   // const [pageState, setPageState] = useState<PageState>('TopLevelState');
   const [pageState, setPageState] = useState<PageState>('ProductInformationAddState');
   const [groceryItemList, setGroceryItemList] = useState<GroceryItemRecord[]>();


   function renderDialog(): ReactElement | null {
      switch (pageState) {
         case 'TopLevelState':
            return <GrocerySupplyAddItemDialog />;
         case 'ItemAddState':
            return <ProductSelectionDialog />;
         case 'ProductInformationAddState':
            return <ProductDataAddDialog />;
         default:
            return null;
      }
   }


   return (
      <div id="grocery-item-add-container">
         { renderDialog() }
      </div>
   );
}


export { GroceryItemAdd };
