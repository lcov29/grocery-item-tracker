/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { AddedItemsPreview } from './subcomponents/addedItemsPreview/AddedItemsPreview';
import { AddNewProductForm } from './subcomponents/addNewProductForm/AddNewProductForm';
import { ProductSelection } from './subcomponents/productSelection/ProductSelection';
import { AddedItemsReceipt } from './subcomponents/addedItemsReceipt/AddedItemsReceipt';
import { GroceryItemData, AddedItemReceiptData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './addSupplyItems.css';


type PageState = 'AddedItemPreview' | 'ProductSelection' | 'AddNewProduct' | 'AddedItemsReceipt';


function AddSupplyItems(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('AddedItemPreview');
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


   function openAddedItemPreviewDialog() {
      setPageState('AddedItemPreview');
   }


   function openProductSelectionDialog() {
      setPageState('ProductSelection');
   }


   function openAddNewProductDialog() {
      setPageState('AddNewProduct');
   }


   function openAddedItemsReceiptDialog() {
      setPageState('AddedItemsReceipt');
   }


   function renderBreadCrumb(): ReactElement | null {
      switch (pageState) {
         case 'ProductSelection':
            return (
               <p className="add-supply-items-breadcrumb">
                  <button type="button" onClick={openAddedItemPreviewDialog}>Add Items To Supply</button>
                  &nbsp; &gt; &nbsp;
                  <b>Select Item To Add</b>
               </p>
            );
            break;
         case 'AddNewProduct':
            return (
               <p className="add-supply-items-breadcrumb">
                  <button type="button" onClick={openAddedItemPreviewDialog}>Add Items To Supply</button>
                  &nbsp; &gt; &nbsp;
                  <button type="button" onClick={openProductSelectionDialog}>Select Item To Add</button>
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
         case 'AddedItemPreview':
            return (
               <AddedItemsPreview
                  setAddedItemsReceiptList={setAddedItemsReceiptList}
                  openProductSelectionDialog={openProductSelectionDialog}
                  openAddedItemsReceiptDialog={openAddedItemsReceiptDialog}
                  removeGroceryItemFromList={removeGroceryItemFromList}
                  groceryItemDataList={groceryItemList}
               />
            );
         case 'ProductSelection':
            return (
               <ProductSelection
                  addGroceryItemData={addGroceryItemToList}
                  openAddNewProductDialog={openAddNewProductDialog}
                  openAddedItemPreviewDialog={openAddedItemPreviewDialog}
               />
            );
         case 'AddNewProduct':
            return (
               <AddNewProductForm
                  openProductSelectionDialog={openProductSelectionDialog}
               />
            );
         case 'AddedItemsReceipt':
            return (
               <AddedItemsReceipt
                  addedItemsReceiptDataList={addedItemsReceiptList}
               />
            );
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
