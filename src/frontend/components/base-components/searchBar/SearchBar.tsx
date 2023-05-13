import React, { ReactElement, useState } from 'react';
import { SearchableDropdown } from '../searchableDropdown/SearchableDropdown';
import './searchBar.css';


type SearchBarProps = {
   id: string,
   optionList: string[],
   placeholderText?: string,
   action?: (input: string) => void
};


function SearchBar(props: SearchBarProps): ReactElement {
   const { id, placeholderText, optionList, action } = props;
   const [searchInput, setSearchInput] = useState('');


   function handleSearchClick() {
      if (action) {
         action(searchInput);
      }
   }


   return (
      <div>
         <SearchableDropdown
            id={id}
            className="search-input"
            placeholderText={placeholderText}
            optionList={optionList}
            inputHandler={setSearchInput}
         />
         <button type="button" className="search-button" onClick={handleSearchClick}>Search</button>
      </div>
   );
}


export { SearchBar };
