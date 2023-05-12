import React, { ReactElement } from 'react';
import { SearchableDropdown } from '../searchableDropdown/SearchableDropdown';
import './searchBar.css';


type SearchBarProps = {
   id: string,
   placeholderText?: string,
   optionList: string[],
   action?: () => void
};


function SearchBar(props: SearchBarProps): ReactElement {
   const { id, placeholderText, optionList, action } = props;
   return (
      <div>
         <SearchableDropdown
            id={id}
            className="search-input"
            placeholderText={placeholderText}
            optionList={optionList}
         />
         <button type="button" className="search-button" onClick={action}>Search</button>
      </div>
   );
}


export { SearchBar };
