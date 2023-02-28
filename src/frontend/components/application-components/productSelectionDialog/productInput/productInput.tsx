/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, getPageId } from '../../../../utility/fetchServerData';
import { ProductNameListData } from '../../../../../tsDataTypes/tsTypesGroceryItemAdd';


function ProductInput(): ReactElement {

   const [productData, setProductData] = useState<ProductNameListData[]>([]);


   useEffect(() => {
      fetchData(`/api/${getPageId()}/productNameList`, setProductData);
   });


   function buildProductNameList(productNameListData: ProductNameListData[]): string[] {
      return productNameListData.map((element) => element.name);
   }


   return (
      <>
         <label htmlFor="input-product-name" className="product-selection-dialog-label">Product</label>
         <div>
            <SearchableDropdown
               id="input-product-name"
               className="product-selection-dialog-dropdown-input"
               optionList={buildProductNameList(productData)}
               inputRequired
            />
            <button className="product-selection-dialog-add-button" type="button" onClick={() => {}}>+</button>
         </div>
      </>
   );
}


export { ProductInput };
