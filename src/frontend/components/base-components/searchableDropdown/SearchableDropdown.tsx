import React, { ReactElement } from 'react';
import './searchableDropdown.css';


type SearchableDropdownProps = {
   id: string,
   optionList: string[],
   className?: string,
   placeholderText?: string,
   isNonListedUserInputAllowed?: boolean,
   inputHandler?: (a: string) => void,
};


function SearchableDropdown(props: SearchableDropdownProps): ReactElement {
   const {
      id,
      optionList,
      className = '',
      placeholderText = '',
      isNonListedUserInputAllowed = false,
      inputHandler
   } = props;
   const inputId = id;
   const datalistId = `${id}-list`;


   function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
      const { target } = event;

      const isUserInputFilled = target.value !== '';
      const isUserInputInOptionList = optionList.includes(target.value);
      const isUserInputValid = isUserInputInOptionList || isNonListedUserInputAllowed;

      if (isUserInputFilled && !isUserInputValid) {
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
            className={`searchable-dropdown ${className}`}
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
