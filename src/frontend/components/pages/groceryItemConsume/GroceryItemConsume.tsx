import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { UnconsumedItemId, PreviewConsumedItem, ConsumeItemsFromSupplyResponse } from '../../../../tsDataTypes/tsTypeGroceryItemConsume';
import { getInputValue } from '../../../utility/inputValue';
import { fetchData, sendData } from '../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../utility/parseDate';
import { Table } from '../../base-components/table/Table';
import './groceryItemConsume.css';


type PageState = 'ConsumedItemSelectionState' | 'ConsumedItemConfirmationState';


function GroceryItemConsume(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ConsumedItemSelectionState');
   const [idDropdownContent, setIdDropdownContent] = useState<UnconsumedItemId[]>([]);
   const [previewItemList, setPreviewItemList] = useState<PreviewConsumedItem[]>([]);


   useEffect(() => {
      fetchData<UnconsumedItemId[]>('/api/GroceryItemConsume/unconsumedItemIdList', setIdDropdownContent);
   }, []);


   async function addToPreviewItemList(id: number): Promise<void> {
      const responseData: { data: PreviewConsumedItem }[] = [];
      await fetchData<{ data: PreviewConsumedItem }>(
         `/api/GroceryItemConsume/itemInformationForId/${id}`,
         (response) => responseData.push(response)
      );
      setPreviewItemList([...previewItemList, responseData[0].data]);
   }


   function removeFromPreviewItemList(id: number): void {
      const newList = previewItemList.filter((element) => element.id !== id);
      setPreviewItemList(newList);
   }


   async function handleAddItem(): Promise<void> {
      const inputId = getInputValue('grocery-item-consume-searchbar');
      const isInputEmpty = inputId === '';
      if (isInputEmpty) { return; }

      const id = parseInt(inputId, 10);
      const isNewId = previewItemList.filter((item) => item.id === id).length === 0;

      if (isNewId) {
         await addToPreviewItemList(id);
      }
   }


   function buildIdDropdownContent(): string[] {
      const idInPreviewList = previewItemList.map((element) => element.id);
      const contentList = idDropdownContent.filter(
         (element) => !idInPreviewList.includes(element.id)
      );
      return contentList.map((element) => element.id.toString());
   }


   function buildConsumedItemsPreview(): (string | ReactElement)[][] {
      const result = previewItemList.map(
         (element) => [
            element.id.toString(),
            element.productName,
            element.amount,
            parseDatabaseDate(element.expirationDate),
            <button type="button" onClick={() => { removeFromPreviewItemList(element.id); }}>x</button>
         ]
      );
      result.push([
         <>
            <SearchableDropdown
               id="grocery-item-consume-searchbar"
               placeholderText="Unconsumed Product Id"
               optionList={buildIdDropdownContent()}
            />
            <button type="button" onClick={handleAddItem}>+</button>
         </>, '', '', '', ''
      ]);
      return result;
   }


   /*
   function buildIdListString(): string[] {
      return previewItemList.map((item) => item.id.toString());
   }
   */


   function buildIdListString(): number[] {
      return previewItemList.map((item) => item.id);
   }


   async function handleSaveButtonClick(): Promise<void> {
      const isItemListEmpty = previewItemList.length === 0;
      if (isItemListEmpty) { return; }

      const response = await sendData<{ idList: number[] }, ConsumeItemsFromSupplyResponse>(
         '/api/GroceryItemConsume/consumeItems',
         { idList: buildIdListString() }
      );

      if (response.ok === 200) {
         setPageState('ConsumedItemConfirmationState');
         setPreviewItemList([]);
         await fetchData<UnconsumedItemId[]>(
            '/api/GroceryItemConsume/unconsumedItemIdList',
            setIdDropdownContent
         );
      } else {
         console.log('Items not consumed');
      }
   }


   function generatePageContent(): ReactElement | null {
      switch (pageState) {
         case 'ConsumedItemSelectionState':
            return (
               <>
                  <Table
                     headerList={['Id', 'Product Name', 'Amount', 'Expiration Date', '']}
                     rowList={buildConsumedItemsPreview()}
                  />
                  <div id="grocery-item-consume-consume-button-container">
                     <button type="button" onClick={handleSaveButtonClick}>Consume</button>
                  </div>
               </>
            );
         case 'ConsumedItemConfirmationState':
            return (
               <>
                  <p>Successfully marked selected items as consumed</p>
                  <button type="button" onClick={() => setPageState('ConsumedItemSelectionState')}>Ok</button>
               </>
            );
         default:
            return null;
      }
   }


   return (
      <div id="grocery-item-consume-container">
         <h2>Consume Grocery Items</h2>
         { generatePageContent() }
      </div>
   );

}


export { GroceryItemConsume };
