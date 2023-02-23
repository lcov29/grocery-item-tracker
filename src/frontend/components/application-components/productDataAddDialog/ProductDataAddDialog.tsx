/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, getPageId } from '../../../utility/fetchServerData';
import { MeasurementData, CategoryData } from '../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './productDataAddDialog.css';


function ProductDataAddDialog(): ReactElement {
   const [selectedTopCategory, setSelectedTopCategory] = useState('');
   const [measurementData, setMeasurementData] = useState<MeasurementData[]>();
   const [categoryData, setCategoryData] = useState<CategoryData[]>();


   useEffect(() => {
      fetchData<MeasurementData[]>(`/api/${getPageId()}/measurementUnitData`, setMeasurementData);
      fetchData<CategoryData[]>(`/api/${getPageId()}/categoryData`, setCategoryData);
   }, []);


   function processTopCategoryData(categoryDataList: CategoryData[]): string[] {
      const filteredTopCategoryData = categoryDataList.filter(
         (element) => element.parentCategoryId === null
      );
      const output = filteredTopCategoryData.map(
         (element) => element.name
      );
      return output;
   }


   function processSubCategoryData(categoryDataList: CategoryData[]):
   string[] {
      const topCategoryId = categoryDataList.filter(
         (element) => element.name === selectedTopCategory
      )[0].id;

      const filteredSubCategoryData = categoryDataList.filter(
         (element) => element.parentCategoryId === topCategoryId
      );

      const output = filteredSubCategoryData.map(
         (element) => element.name
      );

      return output;
   }


   function processMeasurementUnitData(measurementUnitDataList: MeasurementData[]):
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
               className="input-product-data-add-product-name"
            />
         </>
      );
   }


   function generateCategoryDropdown(): ReactElement {
      const optionList = (categoryData) ? processTopCategoryData(categoryData) : [];
      return (
         <>
            <label htmlFor="categoryName" className="product-data-label">Category</label>
            <div>
               <SearchableDropdown
                  id="categoryName"
                  className="category-input"
                  optionList={optionList}
                  inputHandler={setSelectedTopCategory}
               />
               <button type="button" className="category-add-button">+</button>
            </div>
         </>
      );
   }


   function generateSubCategoryDropdown(): ReactElement {
      const isCategoryDataValid = selectedTopCategory && categoryData;
      const optionList = (isCategoryDataValid) ? processSubCategoryData(categoryData) : [];
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
               <input type="number" id="input-weight" name="weight" />
               <SearchableDropdown id="unit" optionList={processMeasurementUnitData(measurementDataList)} />
            </div>
         </>
      );
   }


   return (
      <>
         <h2>Add New Product</h2>
         <form id="product-data-add-form" action="/api/GroceryItemAdd/addCategoryData" method="POST">
            { generateProductInput() }
            { generateCategoryDropdown() }
            { generateSubCategoryDropdown() }
            { generateMeasurementUnitDropdown() }
            <div id="product-data-save-button-container">
               <input type="submit" value="Save" />
            </div>
         </form>
      </>
   );
}


export { ProductDataAddDialog };
