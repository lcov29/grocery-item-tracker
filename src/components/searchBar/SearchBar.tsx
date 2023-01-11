import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../searchableDropdown/SearchableDropdown';
import './searchBar-style.css';


type SearchBarProps = {
   id: string,
   placeholderText?: string,
   optionList: string[],
   action?: () => void
};


function SearchBar(props: SearchBarProps): ReactElement {
   const { id, placeholderText, optionList, action } = props;
   return (
      <div className="searchBarContainer">
         <SearchableDropdown id={id} placeholderText={placeholderText} optionList={optionList} />
         <button type="button" className="SearchButton" onClick={action}>Search</button>
      </div>
   );
}


export { SearchBar };
