/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { GrocerySupplyAddItemDialog } from '../../application-components/grocerySupplyAddItemDialog/GrocerySupplyAddItemDialog';
import { ProductDataAddDialog } from '../../application-components/productDataAddDialog/ProductDataAddDialog';
import { ProductSelectionDialog } from '../../application-components/productSelectionDialog/ProductSelectionDialog';
import { GrocerySupplyAddedItemsReceipt } from '../../application-components/grocerySupplyAddedItemsReceipt/GrocerySupplyAddedItemsReceipt';
import { GroceryItemData, AddedItemReceiptData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './groceryItemAdd.css';


type PageState = 'ReceiptItemsAddedState' | 'ItemAddPreviewState' | 'ItemAddState' | 'ProductAddState';


function GroceryItemAdd(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ItemAddPreviewState');
   const [groceryItemList, setGroceryItemList] = useState<GroceryItemData[]>([]);
   const [unusedGroceryItemId, setUnusedGroceryItemId] = useState(1);
   const [addedItemsReceiptList, setAddedItemsReceiptList] = useState<AddedItemReceiptData[]>([]);


   function addGroceryItemToList(item: GroceryItemData): void {
      const newItem = item;
      newItem.id = unusedGroceryItemId;
      setUnusedGroceryItemId((value) => value + 1);
      setGroceryItemList([...groceryItemList, newItem]);
   }


   function removeGroceryItemFromList(id: number): void {
      const newList = groceryItemList.filter((item) => item.id !== id);
      setGroceryItemList(newList);
   }


   function openAddedItemsReceipt() {
      setPageState('ReceiptItemsAddedState');
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
         case 'ReceiptItemsAddedState':
            return (
               <GrocerySupplyAddedItemsReceipt
                  addedItemsReceiptDataList={addedItemsReceiptList}
               />
            );
         case 'ItemAddPreviewState':
            return (
               <GrocerySupplyAddItemDialog
                  setAddedItemsReceiptList={setAddedItemsReceiptList}
                  openItemAddDialog={openItemAddDialog}
                  openAddedItemsReceipt={openAddedItemsReceipt}
                  removeGroceryItemFromList={removeGroceryItemFromList}
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
