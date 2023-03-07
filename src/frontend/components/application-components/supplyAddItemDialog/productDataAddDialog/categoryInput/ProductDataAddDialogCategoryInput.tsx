/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, ReactElement } from 'react';
import { SearchableDropdown } from '../../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, sendData, getPageId } from '../../../../../utility/fetchServerData';
import { CategoryData } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { getInputValue, setInputValue } from '../../../../../utility/inputValue';
import { AddNewCategoryDialog } from '../addNewCategoryDialog/AddNewCategoryDialog';
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
      const isInputValid = category !== '';

      if (isInputValid) {
         await sendData<{ category: string }>(`/api/${getPageId()}/addTopCategoryData`, { category });
         await fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
         setDisplayNewCategoryDialog(false);
      }
   }


   async function handleAddingNewSubcategory(subCategory: string): Promise<void> {
      const topCategory = getInputValue('categoryName');
      const isTopCategoryInputValid = topCategory !== '';
      const isSubcategoryInputValid = subCategory !== '';

      if (isTopCategoryInputValid && isSubcategoryInputValid) {
         await sendData<{ topCategory: string, subCategory: string }>(
            `/api/${getPageId()}/addSubCategoryData`,
            { topCategory, subCategory }
         );
         await fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
         setDisplayNewSubCategoryDialog(false);
      }
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
            <AddNewCategoryDialog
               displayDialog={setDisplayNewCategoryDialog}
               titleText="Add New Category"
               labelText="Category Name"
               handleSave={handleAddingNewCategory}
            />
         );
      }
      return null;
   }


   function generateNewSubCategoryDialog(): ReactElement | null {
      if (displayNewSubCategoryDialog) {
         return (
            <AddNewCategoryDialog
               displayDialog={setDisplayNewSubCategoryDialog}
               titleText="Add New Subcategory"
               labelText="Subcategory Name"
               handleSave={handleAddingNewSubcategory}
            />
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