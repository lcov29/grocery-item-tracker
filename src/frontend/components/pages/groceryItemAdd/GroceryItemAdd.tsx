/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { GrocerySupplyAddItemDialog } from '../../application-components/grocerySupplyAddItemDialog/GrocerySupplyAddItemDialog';
import { ProductDataAddDialog } from '../../application-components/productDataAddDialog/ProductDataAddDialog';
import { ProductSelectionDialog } from '../../application-components/productSelectionDialog/ProductSelectionDialog';
import './groceryItemAdd.css';


type PageState = 'ItemAddOverview' | 'ItemAddState' | 'ProductAddState';

type GroceryItemRecord = {
   productId: number,
   distributorId: number,
   price: number,
   buyDate: Date,
   expirationDate: Date
};


function GroceryItemAdd(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ItemAddState');
   // const [pageState, setPageState] = useState<PageState>('ProductInformationAddState');
   const [groceryItemList, setGroceryItemList] = useState<GroceryItemRecord[]>();


   function openItemAddOverview() {
      setPageState('ItemAddOverview');
   }


   function openItemAddDialog() {
      setPageState('ItemAddState');
   }


   function openProductAddDialog() {
      setPageState('ProductAddState');
   }


   function renderDialog(): ReactElement | null {
      switch (pageState) {
         case 'ItemAddOverview':
            return <GrocerySupplyAddItemDialog />;
         case 'ItemAddState':
            return <ProductSelectionDialog openProductAddDialog={openProductAddDialog} />;
         case 'ProductAddState':
            return <ProductDataAddDialog openItemAddDialog={openItemAddDialog} />;
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
