/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, getPageId } from '../../../../utility/fetchServerData';
import { DistributorNameList } from '../../../../../tsDataTypes/tsTypesGroceryItemAdd';


function DistributorInput(): ReactElement {
   const [distributorData, setDistributorData] = useState<DistributorNameList[]>([]);


   useEffect(() => {
      fetchData(`/api/${getPageId()}/distributorNameList`, setDistributorData);
   });


   function buildDistributorNameList(): string[] {
      return distributorData.map((element) => element.name);
   }


   return (
      <>
         <label htmlFor="input-distributor" className="product-selection-dialog-label">Distributor</label>
         <div>
            <SearchableDropdown
               id="distributor"
               className="product-selection-dialog-dropdown-input"
               optionList={buildDistributorNameList()}
               inputRequired
            />
            <button className="product-selection-dialog-add-button" type="button" onClick={() => {}}>+</button>
         </div>
      </>
   );
}


export { DistributorInput };
