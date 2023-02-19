import React, { ReactElement } from 'react';
import './searchableDropdown.css';


type SearchableDropdownProps = {
   id: string,
   optionList: string[],
   placeholderText?: string,
   inputHandler?: (a: string) => void,
};


function SearchableDropdown(props: SearchableDropdownProps): ReactElement {
   const { id, placeholderText = '', optionList, inputHandler } = props;
   const inputId = id;
   const datalistId = `${id}-list`;


   function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
      const { target } = event;
      const isUserInputInOptionList = optionList.includes(target.value);
      const isUserInputFilled = target.value !== '';

      if (isUserInputFilled && !isUserInputInOptionList) {
         target.value = '';
      }

      if (inputHandler) {
         inputHandler(target.value);
      }
   }


   return (
      <>
         <input
            id={inputId}
            name={inputId}
            className="searchable-dropdown"
            type="search"
            placeholder={placeholderText}
            list={datalistId}
            onBlur={handleUserInput}
         />
         <datalist id={datalistId}>
            {optionList.map((option) => <option key={option} value={option} />)}
         </datalist>
      </>
   );
}

export { SearchableDropdown };
