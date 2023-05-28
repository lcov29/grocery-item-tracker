/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import { SearchableDropdown } from '../../../../../../base-components/searchableDropdown/SearchableDropdown';
import { ModalInputPrompt } from '../../../../../../base-components/modalInputPrompt/ModalInputPrompt';
import { fetchData, sendData } from '../../../../../../../utility/fetchServerData';
import { DistributorNameList } from '../../../../../../../../tsDataTypes/tsTypesGroceryItemAdd';
import './distributorInput.css';


type Props = {
   distributorInput: string,
   setDistributorInput: (a: string) => void
};


function DistributorInput(props: Props): ReactElement {
   const { distributorInput, setDistributorInput } = props;

   const [distributorData, setDistributorData] = useState<DistributorNameList[]>([]);
   const [newDistributor, setNewDistributor] = useState('');
   const [displayNewDistributorDialog, setDisplayNewDistributorDialog] = useState(false);


   useEffect(() => {
      fetchData<DistributorNameList[]>('/api/addSupplyItems/get/distributorNameList', setDistributorData);
   }, []);


   function buildDistributorNameList(): string[] {
      return distributorData.map((element) => element.name);
   }


   async function handleAddingNewDistributor(): Promise<void> {
      const isInputValid = newDistributor !== '';

      if (isInputValid) {
         const payload = { distributor: newDistributor };
         await sendData<{ distributor: string }>('/api/addSupplyItems/post/addNewDistributor', payload);
         await fetchData<DistributorNameList[]>('/api/addSupplyItems/get/distributorNameList', setDistributorData);
         setDisplayNewDistributorDialog(false);
      }
   }


   function generateNewDistributorDialog(): ReactElement | null {
      if (displayNewDistributorDialog) {
         return (
            <ModalInputPrompt
               displayPrompt={setDisplayNewDistributorDialog}
               title="Add New Distributor"
               handleSave={handleAddingNewDistributor}
               inputValue={newDistributor}
               setInputValue={setNewDistributor}
            />
         );
      }
      return null;
   }


   return (
      <>
         <label htmlFor="distributor">Distributor</label>
         <div>
            <SearchableDropdown
               id="distributor"
               className="distributor-input-dropdown"
               optionList={buildDistributorNameList()}
               value={distributorInput}
               setValue={setDistributorInput}
               inputHandler={(input: string) => { setDistributorInput(input); }}
               inputRequired
            />
            <button
               type="button"
               className="distributor-input-add-button"
               title="Add New Distributor"
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
