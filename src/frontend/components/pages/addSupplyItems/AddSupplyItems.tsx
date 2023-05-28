/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { AddedItemsPreview } from './subcomponents/addedItemsPreview/AddedItemsPreview';
import { AddNewProductForm } from './subcomponents/addNewProductForm/AddNewProductForm';
import { ProductSelection } from './subcomponents/productSelection/ProductSelection';
import { AddedItemsReceipt } from './subcomponents/addedItemsReceipt/AddedItemsReceipt';
import { GroceryItemData, AddedItemReceiptData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './addSupplyItems.css';


type PageState = 'ReceiptItemsAddedState' | 'ItemAddPreviewState' | 'ItemAddState' | 'ProductAddState';


function AddSupplyItems(): ReactElement {

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


   function renderBreadCrumb(): ReactElement | null {
      switch (pageState) {
         case 'ItemAddState':
            return (
               <p className="add-supply-items-breadcrumb">
                  <button type="button" onClick={openItemAddOverview}>Add Items To Supply</button>
                  &nbsp; &gt; &nbsp;
                  <b>Select Item To Add</b>
               </p>
            );
            break;
         case 'ProductAddState':
            return (
               <p className="add-supply-items-breadcrumb">
                  <button type="button" onClick={openItemAddOverview}>Add Items To Supply</button>
                  &nbsp; &gt; &nbsp;
                  <button type="button" onClick={openItemAddDialog}>Select Item To Add</button>
                  &nbsp; &gt; &nbsp;
                  <b>Add New Product</b>
               </p>
            );
            break;
         default:
            return null;
      }
   }


   function renderDialog(): ReactElement | null {
      switch (pageState) {
         case 'ReceiptItemsAddedState':
            return (
               <AddedItemsReceipt
                  addedItemsReceiptDataList={addedItemsReceiptList}
               />
            );
         case 'ItemAddPreviewState':
            return (
               <AddedItemsPreview
                  setAddedItemsReceiptList={setAddedItemsReceiptList}
                  openItemAddDialog={openItemAddDialog}
                  openAddedItemsReceipt={openAddedItemsReceipt}
                  removeGroceryItemFromList={removeGroceryItemFromList}
                  groceryItemDataList={groceryItemList}
               />
            );
         case 'ItemAddState':
            return (
               <ProductSelection
                  addGroceryItemData={addGroceryItemToList}
                  openProductAddDialog={openProductAddDialog}
                  openItemAddOverview={openItemAddOverview}
               />
            );
         case 'ProductAddState':
            return <AddNewProductForm openItemAddDialog={openItemAddDialog} />;
         default:
            return null;
      }
   }


   return (
      <main className="add-supply-items-main">
         <div className="add-supply-items-container">
            { renderBreadCrumb() }
            { renderDialog() }
         </div>
      </main>
   );
}


export { AddSupplyItems };
