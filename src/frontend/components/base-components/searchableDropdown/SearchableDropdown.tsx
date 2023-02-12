import React, { ReactElement } from 'react';
import './searchableDropdown.css';


type SearchableDropdownProps = {
   id: string,
   placeholderText?: string,
   optionList: string[]
};


function SearchableDropdown(props: SearchableDropdownProps): ReactElement {
   const { id, placeholderText = '', optionList } = props;
   const inputId = `${id}-input`;
   const datalistId = `${id}-list`;


   function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
      const { target } = event;
      const isUserInputInOptionList = optionList.includes(target.value);
      const isUserInputFilled = target.value !== '';

      if (isUserInputFilled && !isUserInputInOptionList) {
         target.value = '';
      }
   }


   return (
      <>
         <input id={inputId} name={inputId} className="searchable-dropdown" type="search" placeholder={placeholderText} list={datalistId} onBlur={handleUserInput} />
         <datalist id={datalistId}>
            {optionList.map((option) => <option key={option} value={option} />)}
         </datalist>
      </>
   );
}

export { SearchableDropdown };
