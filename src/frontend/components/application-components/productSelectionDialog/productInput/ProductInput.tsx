/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, getPageId } from '../../../../utility/fetchServerData';
import { ProductNameListData } from '../../../../../tsDataTypes/tsTypesGroceryItemAdd';


type ProductInputProps = {
   openProductAddDialog: () => void
};


function ProductInput(props: ProductInputProps): ReactElement {

   const { openProductAddDialog } = props;
   const [productData, setProductData] = useState<ProductNameListData[]>([]);


   useEffect(() => {
      fetchData(`/api/${getPageId()}/productNameList`, setProductData);
   }, []);


   function buildProductNameList(productNameListData: ProductNameListData[]): string[] {
      return productNameListData.map((element) => element.name);
   }


   return (
      <>
         <label htmlFor="input-product-name" className="product-selection-dialog-label">Product</label>
         <div>
            <SearchableDropdown
               id="productName"
               className="product-selection-dialog-dropdown-input"
               optionList={buildProductNameList(productData)}
               inputRequired
            />
            <button className="product-selection-dialog-add-button" type="button" onClick={openProductAddDialog}>+</button>
         </div>
      </>
   );
}


export { ProductInput };
