/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData } from '../../../../../../../utility/fetchServerData';
import { ProductNameListData } from '../../../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './productInput.css';


type ProductInputProps = {
   openProductAddDialog: () => void
   productInput: string,
   setProductInput: (a: string) => void
};


function ProductInput(props: ProductInputProps): ReactElement {
   const { openProductAddDialog, productInput, setProductInput } = props;
   const [productData, setProductData] = useState<ProductNameListData[]>([]);


   useEffect(() => {
      fetchData('/api/addSupplyItems/get/productNameList', setProductData);
   }, []);


   function buildProductNameList(productNameListData: ProductNameListData[]): string[] {
      return productNameListData.map((element) => element.name);
   }


   return (
      <>
         <label htmlFor="productName">Product</label>
         <div>
            <SearchableDropdown
               id="productName"
               value={productInput}
               setValue={setProductInput}
               className="product-input-dropdown"
               inputHandler={(input: string) => { setProductInput(input); }}
               optionList={buildProductNameList(productData)}
               inputRequired
            />
            <button className="product-input-add-button" type="button" onClick={openProductAddDialog}>+</button>
         </div>
      </>
   );
}


export { ProductInput };
