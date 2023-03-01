/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { GrocerySupplyAddItemDialog } from '../../application-components/grocerySupplyAddItemDialog/GrocerySupplyAddItemDialog';
import { ProductDataAddDialog } from '../../application-components/productDataAddDialog/ProductDataAddDialog';
import { ProductSelectionDialog } from '../../application-components/productSelectionDialog/ProductSelectionDialog';
import { GroceryItemData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './groceryItemAdd.css';


type PageState = 'ReceiptItemsAddedState' | 'ItemAddPreviewState' | 'ItemAddState' | 'ProductAddState';


function GroceryItemAdd(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ItemAddPreviewState');
   const [groceryItemList, setGroceryItemList] = useState<GroceryItemData[]>([]);


   function addGroceryItemToList(item: GroceryItemData): void {
      setGroceryItemList([...groceryItemList, item]);
   }


   function openItemAddOverview() {
      setPageState('ItemAddPreviewState');
   }


   function openItemAddDialog() {
      setPageState('ItemAddState');
   }


   function openProductAddDialog() {
      setPageState('ProductAddState');
   }


   function renderDialog(): ReactElement | null {
      switch (pageState) {
         case 'ItemAddPreviewState':
            return (
               <GrocerySupplyAddItemDialog
                  openItemAddDialog={openItemAddDialog}
                  groceryItemDataList={groceryItemList}
               />
            );
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
