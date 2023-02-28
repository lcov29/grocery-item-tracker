/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { GrocerySupplyAddItemDialog } from '../../application-components/grocerySupplyAddItemDialog/GrocerySupplyAddItemDialog';
import { ProductDataAddDialog } from '../../application-components/productDataAddDialog/ProductDataAddDialog';
import { ProductSelectionDialog } from '../../application-components/productSelectionDialog/ProductSelectionDialog';
import { GroceryItemData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './groceryItemAdd.css';


type PageState = 'ItemAddOverview' | 'ItemAddState' | 'ProductAddState';


function GroceryItemAdd(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ItemAddState');
   // const [pageState, setPageState] = useState<PageState>('ProductInformationAddState');
   const [groceryItemList, setGroceryItemList] = useState<GroceryItemData[]>([]);


   function addGroceryItemToList(item: GroceryItemData): void {
      setGroceryItemList([...groceryItemList, item]);
   }


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
            return (
               <ProductSelectionDialog
                  addGroceryItemData={addGroceryItemToList}
                  openProductAddDialog={openProductAddDialog}
                  openItemAddOverview={openItemAddOverview}
               />
            );
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
