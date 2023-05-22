import React, { ReactElement } from 'react';
import './searchableDropdown.css';


type SearchableDropdownProps = {
   id: string,
   optionList: string[],
   value?: string,
   className?: string,
   placeholderText?: string,
   isNonListedInputAllowed?: boolean,
   inputRequired?: boolean,
   inputHandler?: (input: string) => void,
};


function SearchableDropdown(props: SearchableDropdownProps): ReactElement {
   const {
      id,
      optionList,
      value = '',
      className = '',
      placeholderText = '',
      isNonListedInputAllowed = false,
      inputRequired = false,
      inputHandler
   } = props;
   const inputId = id;
   const datalistId = `${id}-list`;


   function handleInputBlur(event: React.ChangeEvent<HTMLInputElement>): void {
      const { target } = event;

      const isUserInputFilled = target.value !== '';
      const isUserInputInOptionList = optionList.includes(target.value);
      const isUserInputValid = isUserInputInOptionList || isNonListedInputAllowed;

      if (isUserInputFilled && !isUserInputValid) {
         target.value = '';
      }
   }


   function handleUserInput(event: React.ChangeEvent<HTMLInputElement>): void {
      const { target } = event;
      if (inputHandler) {
         inputHandler(target.value);
      }
   }


   function generateInput(): ReactElement {
      if (inputRequired) {
         return (
            <input
               id={inputId}
               name={inputId}
               value={value}
               className={`searchable-dropdown ${className}`}
               type="search"
               placeholder={placeholderText}
               list={datalistId}
               onChange={handleUserInput}
               onBlur={handleInputBlur}
               required
            />
         );
      }


      return (
         <input
            id={inputId}
            name={inputId}
            value={value}
            className={`searchable-dropdown ${className}`}
            type="search"
            placeholder={placeholderText}
            list={datalistId}
            onChange={handleUserInput}
            onBlur={handleInputBlur}
         />
      );
   }


   return (
      <>
         { generateInput() }
         <datalist id={datalistId}>
            {optionList.map((option) => <option key={option} value={option} />)}
         </datalist>
      </>
   );
}


export { SearchableDropdown };
