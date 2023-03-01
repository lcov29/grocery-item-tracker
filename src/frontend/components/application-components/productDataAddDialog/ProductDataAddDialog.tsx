/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, getPageId } from '../../../utility/fetchServerData';
import { MeasurementData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { ProductDataAddDialogCategoryInput } from './categoryInput/ProductDataAddDialogCategoryInput';
import './productDataAddDialog.css';


type ProductDataAddDialogProps = {
   openItemAddDialog: () => void;
};


function ProductDataAddDialog(props: ProductDataAddDialogProps): ReactElement {
   const { openItemAddDialog } = props;
   const [measurementData, setMeasurementData] = useState<MeasurementData[]>();


   useEffect(() => {
      fetchData<MeasurementData[]>(`/api/${getPageId()}/measurementUnitData`, setMeasurementData);
   }, []);


   function buildMeasurementUnitSymbolList(measurementUnitDataList: MeasurementData[]):
   string[] {
      return measurementUnitDataList.map((element) => element.unitSymbol);
   }


   function generateProductInput(): ReactElement {
      return (
         <>
            <label htmlFor="input-product-name" className="product-data-label">Product</label>
            <input
               type="text"
               id="input-product-name"
               name="productName"
               className="product-add-dialog-input-field"
               required
            />
         </>
      );
   }


   function generateMeasurementUnitDropdown(): ReactElement {
      const measurementDataList = measurementData || [{ id: 1, unitName: '', unitSymbol: '' }];
      return (
         <>
            <label htmlFor="input-weight" className="product-data-label">Weight</label>
            <div id="input-weight-container">
               <input
                  type="number"
                  id="input-weight"
                  name="weight"
                  className="product-add-dialog-input-field"
                  min={0}
                  max={1_000_000}
                  required
               />
               <SearchableDropdown
                  id="unit"
                  optionList={buildMeasurementUnitSymbolList(measurementDataList)}
                  inputRequired
               />
            </div>
         </>
      );
   }


   return (
      <>
         <h2>Add New Product</h2>
         <form id="product-data-add-form" action="/api/GroceryItemAdd/addNewProduct" method="POST">
            { generateProductInput() }
            <ProductDataAddDialogCategoryInput />
            { generateMeasurementUnitDropdown() }
            <button type="button" onClick={openItemAddDialog}>Back</button>
            <div id="product-data-save-button-container">
               <button type="submit">Save</button>
            </div>
         </form>
      </>
   );
}


export { ProductDataAddDialog };
