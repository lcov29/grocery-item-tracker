/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, sendData } from '../../../../../utility/fetchServerData';
import { MeasurementData } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { AddNewCategories } from './subcomponents/addNewCategories/AddNewCategories';
import backIcon from '../../../../../icons/backArrowIcon.svg';
import './addNewProductForm.css';


type ProductDataAddDialogProps = {
   openProductSelectionDialog: () => void;
};


function AddNewProductForm(props: ProductDataAddDialogProps): ReactElement {
   const { openProductSelectionDialog } = props;
   const [measurementData, setMeasurementData] = useState<MeasurementData[]>();
   const [productInput, setProductInput] = useState('');
   const [categoryInput, setCategoryInput] = useState('');
   const [subCategoryInput, setSubCategoryInput] = useState('');
   const [weightInput, setWeightInput] = useState(0);
   const [unitInput, setUnitInput] = useState('');


   useEffect(() => {
      fetchData<MeasurementData[]>('/api/addSupplyItems/get/measurementUnitData', setMeasurementData);
   }, []);



   function buildMeasurementUnitSymbolList(measurementUnitDataList: MeasurementData[]): string[] {
      return measurementUnitDataList.map((element) => element.unitSymbol);
   }


   function generateProductInput(): ReactElement {
      return (
         <>
            <label htmlFor="add-new-product-form-input">Product</label>
            <input
               type="text"
               id="add-new-product-form-input"
               className="add-new-product-form-input add-new-product-form-product-input"
               value={productInput}
               onChange={(e) => setProductInput(e.target.value)}
               required
            />
         </>
      );
   }


   function generateMeasurementUnitDropdown(): ReactElement {
      const measurementDataList = measurementData || [{ id: 1, unitName: '', unitSymbol: '' }];
      return (
         <>
            <label htmlFor="input-weight">Weight</label>
            <div className="add-new-product-form-weight-input-container">
               <input
                  type="number"
                  id="input-weight"
                  className="add-new-product-form-input"
                  min={0}
                  max={1_000_000}
                  value={weightInput}
                  onChange={(e) => setWeightInput(Number.parseInt(e.target.value, 10))}
                  required
               />
               <SearchableDropdown
                  id="unit"
                  className="add-new-product-form-weight-unit-input add-new-product-form-input"
                  optionList={buildMeasurementUnitSymbolList(measurementDataList)}
                  value={unitInput}
                  setValue={setUnitInput}
                  inputHandler={setUnitInput}
                  inputRequired
               />
            </div>
         </>
      );
   }


   async function submitFormData(): Promise<void> {
      const payload = {
         productName: productInput,
         categoryName: categoryInput,
         subcategoryName: subCategoryInput,
         weight: weightInput,
         unit: unitInput
      };
      openProductSelectionDialog();
      await sendData('/api/addSupplyItems/post/addNewProduct', payload);
   }


   return (
      <>
         <h2>Add New Product</h2>
         <form className="add-new-product-form">
            { generateProductInput() }
            <AddNewCategories
               categoryInput={categoryInput}
               subCategoryInput={subCategoryInput}
               setCategoryInput={setCategoryInput}
               setSubCategoryInput={setSubCategoryInput}
            />
            { generateMeasurementUnitDropdown() }
         </form>
         <div className="add-new-product-form-controls-container">
            <button type="button" onClick={openProductSelectionDialog}>
               <img src={backIcon} alt="Back" width="35px" height="25px" />
            </button>
            <button type="button" onClick={submitFormData}>OK</button>
         </div>
      </>
   );
}


export { AddNewProductForm };
