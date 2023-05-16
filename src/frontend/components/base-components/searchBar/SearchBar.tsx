import React, { ReactElement, useState } from 'react';
import { SearchableDropdown } from '../searchableDropdown/SearchableDropdown';
import searchIcon from '../../../icons/search.svg';
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
      <div className="search-bar">
         <SearchableDropdown
            id={id}
            className="search-input"
            placeholderText={placeholderText}
            optionList={optionList}
            inputHandler={setSearchInput}
         />
         <button type="button" className="search-button" onClick={handleSearchClick}>
            <img src={searchIcon} alt="Search" width="20px" height="20px" />
         </button>
      </div>
   );
}


export { SearchBar };
