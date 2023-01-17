import { MouseEvent, ChangeEvent } from 'react';


type ButtonFocusEvent = ChangeEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>;


function addMenuButtonHightlight(menuButton: HTMLElement) {
   menuButton.classList.add('active');
}


function removeAllMenuButtonHighlights() {
   const menuButtonList = document.querySelectorAll<HTMLElement>('.menu-entry-button');
   menuButtonList.forEach((menuButton) => menuButton.classList.remove('active'));
}


function showDropdown(dropdown: HTMLElement | undefined) {
   if (dropdown) {
      dropdown.classList.add('visible');
   }
}


function hideAllDropdowns() {
   const dropdownList = document.querySelectorAll<HTMLElement>('.menu-entry-dropdown');
   dropdownList.forEach((dropdown) => dropdown.classList.remove('visible'));
}


function handleMenuButtonFocus(event: ButtonFocusEvent): void {
   const button = event.target as HTMLElement;
   const dropdown = button.nextElementSibling as HTMLElement | undefined;

   event.stopPropagation();
   removeAllMenuButtonHighlights();
   addMenuButtonHightlight(button);
   hideAllDropdowns();
   showDropdown(dropdown);
}


export { handleMenuButtonFocus, hideAllDropdowns, removeAllMenuButtonHighlights };
