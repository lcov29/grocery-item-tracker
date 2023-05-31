import React, { ReactElement, useState, useEffect } from 'react';
import { UnconsumedItemId } from '../../../../../../tsDataTypes/tsTypeGroceryItemConsume';
import { SearchableDropdown } from '../../../../base-components/searchableDropdown/SearchableDropdown';
import { fetchData } from '../../../../../utility/fetchServerData';
import plusIcon from '../../../../../icons/plusIcon.svg';
import './itemIdDropdown.css';


type Props = {
   idInput: string,
   setIdInput: (a: string) => void,
   previewIdList: number[],
   handleButtonClick: () => Promise<void>
};


function ItemIdDropdown(props: Props): ReactElement {
   const { idInput, setIdInput, previewIdList, handleButtonClick } = props;
   const [idList, setIdList] = useState<UnconsumedItemId[]>([]);


   useEffect(() => {
      const route = '/api/consumeSupplyItems/get/unconsumedItemIdList';
      fetchData<UnconsumedItemId[]>(route, setIdList);
   }, []);


   function buildDropdownList(): string[] {
      const contentList = idList.filter((element) => !previewIdList.includes(element.id));
      return contentList.map((element) => element.id.toString());
   }


   return (
      <div className="consume-supply-items-searchbar">
         <SearchableDropdown
            id="consume-supply-items-searchbar"
            value={idInput}
            setValue={setIdInput}
            placeholderText="Unconsumed Product Id"
            optionList={buildDropdownList()}
            inputHandler={setIdInput}
         />
         <button type="button" onClick={handleButtonClick}>
            <img src={plusIcon} alt="X" width="12px" height="12px" />
         </button>
      </div>
   );
}


export { ItemIdDropdown };
