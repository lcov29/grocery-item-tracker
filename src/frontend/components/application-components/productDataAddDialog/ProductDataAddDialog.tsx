/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, sendData, getPageId } from '../../../utility/fetchServerData';
import { MeasurementData, CategoryData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './productDataAddDialog.css';


function ProductDataAddDialog(): ReactElement {
   const [selectedTopCategory, setSelectedTopCategory] = useState('');
   const [measurementData, setMeasurementData] = useState<MeasurementData[]>();
   const [categoryData, setCategoryData] = useState<CategoryData[]>();
   const [displayNewCategoryDialog, setDisplayNewCategoryDialog] = useState(false);


   useEffect(() => {
      fetchData<MeasurementData[]>(`/api/${getPageId()}/measurementUnitData`, setMeasurementData);
      fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
   }, []);


   function buildTopCategoryNameList(categoryDataList: CategoryData[]): string[] {
      const topCategoryList = categoryDataList.filter(
         (element) => element.parentCategoryId === null
      );

      return topCategoryList.map(
         (element) => element.name
      );
   }


   function buildMappedSubcategoryNameList(categoryDataList: CategoryData[]):
   string[] {
      const selectedCategory = categoryDataList.filter(
         (element) => element.name === selectedTopCategory
      );

      const isSelectedCategoryNew = selectedCategory.length === 0;
      if (isSelectedCategoryNew) {
         return [];
      }

      const mappedSubCategoryList = categoryDataList.filter(
         (element) => element.parentCategoryId === selectedCategory[0].id
      );

      return mappedSubCategoryList.map(
         (element) => element.name
      );
   }


   function buildMeasurementUnitSymbolList(measurementUnitDataList: MeasurementData[]):
   string[] {
      return measurementUnitDataList.map((element) => element.unitSymbol);
   }


   function handleCategoryInput(categoryInput: string): void {
      if (!categoryData) { return; }

      const isCategoryInputEmpty = categoryInput === '';
      const selectedCategoryData = categoryData.filter((element) => element.name === categoryInput);
      const isInputExistingCategory = selectedCategoryData.length > 0;

      if (isCategoryInputEmpty || isInputExistingCategory) {
         setSelectedTopCategory(categoryInput);
      } else {
         const categoryInputElement = document.getElementById('categoryName') as HTMLInputElement;
         categoryInputElement.value = '';
      }
   }


   async function handleAddingNewCategory(categoryInput: string): Promise<void> {
      await sendData<{ category: string }>(`/api/${getPageId()}/addCategoryData`, { category: categoryInput });
      await fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
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
            />
         </>
      );
   }


   function generateCategoryDropdown(): ReactElement {
      const optionList = (categoryData) ? buildTopCategoryNameList(categoryData) : [];
      return (
         <>
            <label htmlFor="categoryName" className="product-data-label">Category</label>
            <div>
               <SearchableDropdown
                  id="categoryName"
                  className="category-input"
                  optionList={optionList}
                  inputHandler={handleCategoryInput}
                  isNonListedUserInputAllowed
               />
               <button
                  type="button"
                  className="category-add-button"
                  onClick={() => { setDisplayNewCategoryDialog(true); }}
               >
                  +
               </button>
            </div>
         </>
      );
   }


   function generateSubCategoryDropdown(): ReactElement {
      const isCategoryDataValid = selectedTopCategory && categoryData;
      const optionList = (isCategoryDataValid) ? buildMappedSubcategoryNameList(categoryData) : [];
      return (
         <>
            <label htmlFor="subcategoryName" className="product-data-label">Subcategory</label>
            <div>
               <SearchableDropdown id="subcategoryName" className="category-input" optionList={optionList} />
               <button type="button" className="category-add-button">+</button>
            </div>
         </>
      );
   }


   function generateMeasurementUnitDropdown(): ReactElement {
      const measurementDataList = measurementData || [{ id: 1, unitName: '', unitSymbol: '' }];
      return (
         <>
            <label htmlFor="input-weight" className="product-data-label">Weight</label>
            <div id="input-weight-container">
               <input type="number" id="input-weight" name="weight" className="product-add-dialog-input-field" />
               <SearchableDropdown id="unit" optionList={buildMeasurementUnitSymbolList(measurementDataList)} />
            </div>
         </>
      );
   }


   function generateNewCategoryDialog(): ReactElement | null {
      if (displayNewCategoryDialog) {
         return (
            <>
               <div className="product-add-dialog-modal-overlay">&nbsp;</div>
               <div id="product-add-dialog-new-category-modal-window">
                  <h3>Add New Category</h3>
                  <label htmlFor="product-add-dialog-new-category-input" className="product-data-label">
                     Category Name
                  </label>
                  <input
                     type="text"
                     id="product-add-dialog-new-category-input"
                     name="categoryName"
                     className="product-add-dialog-input-field"
                  />
                  <br />
                  <div className="product-add-dialog-modal-window-control-bar">
                     <button
                        type="button"
                        onClick={() => { setDisplayNewCategoryDialog(false); }}
                     >
                        Cancel
                     </button>
                     <button
                        type="button"
                        onClick={() => {
                           const categoryInput = document.getElementById('product-add-dialog-new-category-input') as HTMLInputElement;
                           const isCategoryInputValid = categoryInput.value !== '';

                           if (isCategoryInputValid) {
                              handleAddingNewCategory(categoryInput.value);
                              setDisplayNewCategoryDialog(false);
                           }
                        }}
                     >
                        Save
                     </button>
                  </div>

               </div>
            </>
         );
      }
      return null;
   }


   return (
      <>
         <h2>Add New Product</h2>
         <form id="product-data-add-form" action="/api/GroceryItemAdd/addNewProduct" method="POST">
            { generateProductInput() }
            { generateCategoryDropdown() }
            { generateSubCategoryDropdown() }
            { generateMeasurementUnitDropdown() }
            <div id="product-data-save-button-container">
               <input type="submit" value="Save" />
            </div>
         </form>
         { generateNewCategoryDialog() }
      </>
   );
}


export { ProductDataAddDialog };
