/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData, sendData, getPageId } from '../../../../../utility/fetchServerData';
import { DistributorNameList } from '../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import { AddNewCategoryDialog } from '../../productDataAddDialog/addNewCategoryDialog/AddNewCategoryDialog';


function DistributorInput(): ReactElement {
   const [distributorData, setDistributorData] = useState<DistributorNameList[]>([]);
   const [displayNewDistributorDialog, setDisplayNewDistributorDialog] = useState(false);


   useEffect(() => {
      fetchData<DistributorNameList[]>(`/api/${getPageId()}/distributorNameList`, setDistributorData);
   }, []);


   function buildDistributorNameList(): string[] {
      return distributorData.map((element) => element.name);
   }


   async function handleAddingNewDistributor(distributor: string): Promise<void> {
      const isInputValid = distributor !== '';

      if (isInputValid) {
         await sendData<{ distributor: string }>(`/api/${getPageId()}/addNewDistributor`, { distributor });
         await fetchData<DistributorNameList[]>(`/api/${getPageId()}/distributorNameList`, setDistributorData);
         setDisplayNewDistributorDialog(false);
      }
   }


   function generateNewDistributorDialog(): ReactElement | null {
      if (displayNewDistributorDialog) {
         return (
            <AddNewCategoryDialog
               displayDialog={setDisplayNewDistributorDialog}
               titleText="Add New Distributor"
               labelText="Distributor Name"
               handleSave={handleAddingNewDistributor}
            />
         );
      }
      return null;
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
            <button
               className="product-selection-dialog-add-button"
               type="button"
               onClick={() => { setDisplayNewDistributorDialog(true); }}
            >
               +
            </button>
         </div>
         { generateNewDistributorDialog() }
      </>
   );
}


export { DistributorInput };
