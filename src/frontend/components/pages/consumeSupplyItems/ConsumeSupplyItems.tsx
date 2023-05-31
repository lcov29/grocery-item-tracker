/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useState } from 'react';
import { PreviewConsumedItem, ConsumeItemsFromSupplyResponse } from '../../../../tsDataTypes/tsTypeGroceryItemConsume';
import { fetchData, sendData } from '../../../utility/fetchServerData';
import { parseDatabaseDate } from '../../../utility/dateFunctions/dateFunctions';
import { ItemIdDropdown } from './subcomponents/ItemIdDropdown/ItemIdDropdown';
import { Table } from '../../base-components/table/Table';
import closeIcon from '../../../icons/closeIcon.svg';
import './consumeSupplyItems.css';


type PageState = 'ConsumedItemSelectionState' | 'ConsumedItemConfirmationState';


function ConsumeSupplyItems(): ReactElement {

   const [pageState, setPageState] = useState<PageState>('ConsumedItemSelectionState');
   const [previewItemList, setPreviewItemList] = useState<PreviewConsumedItem[]>([]);
   const [productIdInput, setProductIdInput] = useState('');


   async function addToPreviewItemList(id: number): Promise<void> {
      const responseData: { data: PreviewConsumedItem }[] = [];
      await fetchData<{ data: PreviewConsumedItem }>(
         `/api/consumeSupplyItems/get/itemInformationForId/${id}`,
         (response) => responseData.push(response)
      );
      setPreviewItemList([...previewItemList, responseData[0].data]);
   }


   function removeFromPreviewItemList(id: number): void {
      const newList = previewItemList.filter((element) => element.id !== id);
      setPreviewItemList(newList);
   }


   async function handleAddItem(): Promise<void> {
      const isInputValid = productIdInput !== '';

      if (isInputValid) {
         const id = parseInt(productIdInput, 10);
         const isNewId = previewItemList.filter((item) => item.id === id).length === 0;
         if (isNewId) {
            await addToPreviewItemList(id);
         }
         setProductIdInput('');
      }
   }


   function buildConsumedItemsPreview(): (string | ReactElement)[][] {
      const result = previewItemList.map(
         (element) => [
            element.id.toString(),
            element.productName,
            element.amount,
            parseDatabaseDate(element.expirationDate),
            <button
               type="button"
               className="consume-supply-items-item-remove-button"
               title="Remove"
               onClick={() => { removeFromPreviewItemList(element.id); }}
            >
               <img src={closeIcon} alt="X" width="15px" height="15px" />
            </button>
         ]
      );

      const itemIdDropdown = (
         <ItemIdDropdown
            idInput={productIdInput}
            setIdInput={setProductIdInput}
            previewIdList={previewItemList.map((element) => element.id)}
            handleButtonClick={handleAddItem}
         />
      );

      result.push([itemIdDropdown, '', '', '', '']);
      return result;
   }


   function buildIdListString(): number[] {
      return previewItemList.map((item) => item.id);
   }


   async function handleSaveButtonClick(): Promise<void> {
      const isItemListEmpty = previewItemList.length === 0;
      if (isItemListEmpty) { return; }

      const response = await sendData<{ idList: number[] }, ConsumeItemsFromSupplyResponse>(
         '/api/consumeSupplyItems/post/consumeItems',
         { idList: buildIdListString() }
      );

      if (response.ok === 200) {
         setPageState('ConsumedItemConfirmationState');
         setPreviewItemList([]);
      } else {
         console.log('Items not consumed');
      }
   }


   function renderPageControl(): ReactElement | null {
      switch (pageState) {
         case 'ConsumedItemSelectionState':
            return (
               <>
                  <Table
                     headerList={['Id', 'Product Name', 'Amount', 'Expiration Date', '']}
                     rowList={buildConsumedItemsPreview()}
                  />
                  <div className="consume-supply-items-button-container">
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
      <main className="consume-supply-items-main">
         <div className="consume-supply-items-container">
            <h2>Consume Items</h2>
            { renderPageControl() }
         </div>
      </main>
   );

}


export { ConsumeSupplyItems };
