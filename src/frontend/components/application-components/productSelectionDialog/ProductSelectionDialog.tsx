/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../../base-components/searchableDropdown/SearchableDropdown';
import { Counter } from '../../base-components/counter/Counter';
import './productSelectionDialog.css';


function ProductSelectionDialog(): ReactElement {
   return (
      <div id="grocery-item-product-selection-container">
         <h2>Select Grocery Item</h2>
         <form id="product-selection-dialog" onSubmit={() => {}}>
            <label htmlFor="input-product-name">Product Name </label>
            <div id="product-name-line">
               <SearchableDropdown
                  id="input-product-name"
                  optionList={[
                     'Product 1',
                     'Product 2',
                     'Product 3'
                  ]}
               />
               <button id="add-new-product-button" type="button" onClick={() => {}}>+</button>
            </div>
            <label htmlFor="input-category">Category</label>
            <input id="input-category" type="text" disabled />
            <label htmlFor="input-subcategory">Subcategory</label>
            <input id="input-subcategory" type="text" disabled />
            <label htmlFor="input-distributor">Distributor</label>
            <input id="input-distributor" type="text" disabled />
            <label htmlFor="input-amount">Amount</label>
            <Counter value={3} suffix="Items" minimum={1} />
            <label htmlFor="input-price-per-unit">Price Per Unit</label>
            <input id="input-price-per-unit" type="number" />
            <label htmlFor="input-expiration-date">Expiration Date</label>
            <input type="date" id="input-expiration-date" />
         </form>
         <div id="add-button-container">
            <button type="button" onClick={() => {}}>Add</button>
         </div>
      </div>
   );

}


export { ProductSelectionDialog };
