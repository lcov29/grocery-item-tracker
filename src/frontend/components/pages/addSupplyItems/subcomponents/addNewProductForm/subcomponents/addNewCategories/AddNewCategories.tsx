/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, ReactElement } from 'react';
import { SearchableDropdown } from '../../../../../../base-components/searchableDropdown/SearchableDropdown';
import { ModalInputPrompt } from '../../../../../../base-components/modalInputPrompt/ModalInputPrompt';
import { fetchData, sendData } from '../../../../../../../utility/fetchServerData';
import { CategoryData } from '../../../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import plusIcon from '../../../../../../../icons/plusIcon.svg';
import './addNewCategories.css';


type Props = {
   categoryInput: string,
   subCategoryInput: string,
   setCategoryInput: (e: string) => void,
   setSubCategoryInput: (e: string) => void
};


function AddNewCategories(props: Props): ReactElement {
   const { categoryInput, subCategoryInput, setCategoryInput, setSubCategoryInput } = props;

   const [categoryData, setCategoryData] = useState<CategoryData[]>();
   const [displayNewCategoryDialog, setDisplayNewCategoryDialog] = useState(false);
   const [displayNewSubCategoryDialog, setDisplayNewSubCategoryDialog] = useState(false);


   useEffect(() => {
      fetchData<CategoryData[]>('/api/addSupplyItems/get/categoryData', setCategoryData);
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
         (element) => element.name === categoryInput
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


   async function handleAddingNewCategory(): Promise<void> {
      const isCategoryInputValid = categoryInput !== '';

      if (isCategoryInputValid) {
         await sendData<{ category: string }>('/api/addSupplyItems/post/addTopCategoryData', { category: categoryInput });
         await fetchData<CategoryData[]>('/api/addSupplyItems/get/categoryData', setCategoryData);
         setDisplayNewCategoryDialog(false);
      }
   }


   async function handleAddingNewSubcategory(): Promise<void> {
      const isCategoryInputValid = categoryInput !== '' && subCategoryInput !== '';

      if (isCategoryInputValid) {
         await sendData<{ topCategory: string, subCategory: string }>(
            '/api/addSupplyItems/post/addSubCategoryData',
            { topCategory: categoryInput, subCategory: subCategoryInput }
         );
         await fetchData<CategoryData[]>('/api/addSupplyItems/get/categoryData', setCategoryData);
         setDisplayNewSubCategoryDialog(false);
      }
   }


   function handleCategoryInput(input: string): void {
      const hasCategoryChanged = input !== categoryInput;

      if (hasCategoryChanged) {
         setCategoryInput(input);
         setSubCategoryInput('');
      }
   }


   function generateCategoryDropdown(): ReactElement {
      const optionList = (categoryData) ? buildTopCategoryNameList(categoryData) : [];
      return (
         <>
            <label htmlFor="categoryName">Category</label>
            <div>
               <SearchableDropdown
                  id="categoryName"
                  value={categoryInput}
                  setValue={setCategoryInput}
                  className="add-new-categories-input"
                  optionList={optionList}
                  inputHandler={handleCategoryInput}
                  inputRequired
               />
               <button
                  type="button"
                  className="add-new-categories-button"
                  title="Add New Category"
                  onClick={() => { setDisplayNewCategoryDialog(true); }}
               >
                  <img src={plusIcon} alt="+" width="15px" height="15px" />
               </button>
            </div>
         </>
      );
   }


   function generateSubCategoryDropdown(): ReactElement {
      const isCategoryDataValid = categoryInput && categoryData;
      const optionList = (isCategoryDataValid) ? buildMappedSubcategoryNameList(categoryData) : [];

      const addButton = (categoryInput) ? (
         <button
            type="button"
            className="add-new-categories-button"
            title="Add New Subcategory"
            onClick={() => { setDisplayNewSubCategoryDialog(true); }}
         >
            <img src={plusIcon} alt="+" width="15px" height="15px" />
         </button>
      ) : null;

      return (
         <>
            <label htmlFor="subcategoryName">Subcategory</label>
            <div>
               <SearchableDropdown
                  id="subcategoryName"
                  value={subCategoryInput}
                  setValue={setSubCategoryInput}
                  className="add-new-categories-input"
                  optionList={optionList}
                  inputHandler={setSubCategoryInput}
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
            <ModalInputPrompt
               displayPrompt={setDisplayNewCategoryDialog}
               title="Add New Category"
               handleSave={handleAddingNewCategory}
               inputValue={categoryInput}
               setInputValue={setCategoryInput}
            />
         );
      }
      return null;
   }


   function generateNewSubCategoryDialog(): ReactElement | null {
      if (displayNewSubCategoryDialog) {
         return (
            <ModalInputPrompt
               displayPrompt={setDisplayNewSubCategoryDialog}
               title="Add New Subcategory"
               handleSave={handleAddingNewSubcategory}
               inputValue={subCategoryInput}
               setInputValue={setSubCategoryInput}
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


export { AddNewCategories };
