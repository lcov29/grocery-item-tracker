import React, { ReactElement } from 'react';


type MainButtonType = {
   id: string;
   dropdownId?: string;
   text: string;
};


function MainButton(props: MainButtonType): ReactElement {
   const { id, dropdownId, text } = props;


   function displayDropdown(): void {
      if (dropdownId) {
         const menuDropdownList = document.getElementsByClassName('menuDropdown');

         for (let i = 0; i < menuDropdownList.length; i++) {
            menuDropdownList[i].classList.add('invisible');
            menuDropdownList[i].classList.remove('unrender');
         }

         const dropdown = document.getElementById(dropdownId);
         if (dropdown) {
            dropdown.classList.remove('invisible');
         }
      }
   }


   return (
      <button
         id={id}
         className="mainMenuButton"
         type="button"
         onMouseEnter={displayDropdown}
      >
         {text}
      </button>
   );
}


export { MainButton };
