/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import './productDataAddDialog.css';


function ProductDataAddDialog(): ReactElement {
   return (
      <>
         <h2>Add New Product</h2>
         <form id="product-data-add-form" onSubmit={() => {}}>
            <label htmlFor="input-product-data-add-product-name" className="product-data-label">Product</label>
            <input type="text" id="input-product-data-add-product-name" />
            <label htmlFor="input-product-data-category-name" className="product-data-label">Category</label>
            <SearchableDropdown id="input-product-data-category-name" optionList={['Category 1', 'Category 2']} />
            <label htmlFor="input-subcategory-name" className="product-data-label">Subcategory</label>
            <SearchableDropdown id="input-subcategory-name" optionList={['Subcategory 1', 'Subcategory 2']} />
            <label htmlFor="input-weight" className="product-data-label">Weight</label>
            <div id="input-weight-container">
               <input type="number" id="input-weight" />
               <SearchableDropdown id="input-unit" optionList={['g', 'L']} />
            </div>
         </form>
         <div id="product-data-save-button-container">
            <button type="button" onClick={() => {}}>Save</button>
         </div>
      </>
   );
}


export { ProductDataAddDialog };
