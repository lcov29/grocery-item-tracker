/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import './productDataAddDialog.css';


function ProductDataAddDialog(): ReactElement {
   return (
      <>
         <h2>Add New Product</h2>
         <form id="product-data-add-form" onSubmit={() => {}}>
            <label htmlFor="input-product-name">Product Name</label>
            <input type="text" id="input-product-name" />
            <label htmlFor="input-category-name">Category</label>
            <SearchableDropdown id="input-category-name" optionList={['Category 1', 'Category 2']} />
            <label htmlFor="input-subcategory-name">Subcategory</label>
            <SearchableDropdown id="input-subcategory-name" optionList={['Subcategory 1', 'Subcategory 2']} />
            <label htmlFor="input-weight">Weight</label>
            <input type="number" id="input-weight" />
            <label htmlFor="input-unit">Unit</label>
            <SearchableDropdown id="input-unit" optionList={['g', 'L']} />
            <div id="save-button-container">
               <button type="button" onClick={() => {}}>Save</button>
            </div>
         </form>
      </>
   );
}


export { ProductDataAddDialog };
