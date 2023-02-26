/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, ReactElement } from 'react';
import { SearchableDropdown } from '../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, sendData, getPageId } from '../../../../utility/fetchServerData';
import { CategoryData } from '../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { setInputValue, getInputValue } from '../../../../utility/inputValue';
import './productDataAddDialogCategoryInput.css';


function ProductDataAddDialogCategoryInput(): ReactElement {
   const [selectedTopCategory, setSelectedTopCategory] = useState('');
   const [categoryData, setCategoryData] = useState<CategoryData[]>();
   const [displayNewCategoryDialog, setDisplayNewCategoryDialog] = useState(false);
   const [displayNewSubCategoryDialog, setDisplayNewSubCategoryDialog] = useState(false);


   useEffect(() => {
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


   function buildMappedSubcategoryNameList(categoryDataList: CategoryData[]): string[] {
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


   async function handleAddingNewCategory(category: string): Promise<void> {
      await sendData<{ category: string }>(`/api/${getPageId()}/addTopCategoryData`, { category });
      await fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
   }


   async function handleAddingNewSubcategory(category: string, subCategory: string): Promise<void> {
      await sendData<{ category: string, subCategory: string }>(
         `/api/${getPageId()}/addSubCategoryData`,
         { category, subCategory }
      );
      await fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
   }


   function handleCategoryInput(category: string): void {
      const hasCategoryChanged = category !== selectedTopCategory;

      if (hasCategoryChanged) {
         setSelectedTopCategory(category);
         setInputValue('subcategoryName', '');
      }
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
                  inputRequired
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

      const addButton = (selectedTopCategory) ? (
         <button
            type="button"
            className="category-add-button"
            onClick={() => { setDisplayNewSubCategoryDialog(true); }}
         >
            +
         </button>
      ) : null;

      return (
         <>
            <label htmlFor="subcategoryName" className="product-data-label">Subcategory</label>
            <div>
               <SearchableDropdown
                  id="subcategoryName"
                  className="category-input"
                  optionList={optionList}
                  inputRequired
               />
               { addButton }
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
                           const category = getInputValue('product-add-dialog-new-category-input');
                           const isCategoryInputValid = category !== '';

                           if (isCategoryInputValid) {
                              handleAddingNewCategory(category);
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


   function generateNewSubCategoryDialog(): ReactElement | null {
      if (displayNewSubCategoryDialog) {
         return (
            <>
               <div className="product-add-dialog-modal-overlay">&nbsp;</div>
               <div id="product-add-dialog-new-category-modal-window">
                  <h3>Add New Subcategory</h3>
                  <label htmlFor="product-add-dialog-new-subcategory-input" className="product-data-label">
                     Subcategory Name
                  </label>
                  <input
                     type="text"
                     id="product-add-dialog-new-subcategory-input"
                     name="subcategoryName"
                     className="product-add-dialog-input-field"
                  />
                  <br />
                  <div className="product-add-dialog-modal-window-control-bar">
                     <button
                        type="button"
                        onClick={() => { setDisplayNewSubCategoryDialog(false); }}
                     >
                        Cancel
                     </button>
                     <button
                        type="button"
                        onClick={() => {
                           const topCategory = getInputValue('categoryName');
                           const subCategory = getInputValue('product-add-dialog-new-subcategory-input');
                           const isTopCategoryInputValid = topCategory !== '';
                           const isSubcategoryInputValid = subCategory !== '';

                           if (isTopCategoryInputValid && isSubcategoryInputValid) {
                              handleAddingNewSubcategory(topCategory, subCategory);
                              setDisplayNewSubCategoryDialog(false);
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
         { generateCategoryDropdown() }
         { generateSubCategoryDropdown() }
         { generateNewCategoryDialog() }
         { generateNewSubCategoryDialog() }
      </>
   );


}


export { ProductDataAddDialogCategoryInput };
