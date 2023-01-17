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


function isDesktopView(windowInnerWidth: number): boolean {
   return windowInnerWidth > 700;
}

type MenuButtonEvent = ButtonFocusEvent | MouseEvent<HTMLButtonElement>;


function handleMenuButtonInteraction(event: MenuButtonEvent): void {
   const button = event.target as HTMLElement;
   const dropdown = button.nextElementSibling as HTMLElement | undefined;

   event.stopPropagation();
   removeAllMenuButtonHighlights();
   addMenuButtonHightlight(button);
   hideAllDropdowns();
   showDropdown(dropdown);
}


function handleMenuButtonHover(event: ButtonFocusEvent): void {
   if (isDesktopView(window.innerWidth)) {
      handleMenuButtonInteraction(event);
   }
}


function handleMenuButtonClick(event: MouseEvent<HTMLButtonElement>): void {
   if (!isDesktopView(window.innerWidth)) {
      handleMenuButtonInteraction(event);
   }
}


export {
   handleMenuButtonHover,
   handleMenuButtonClick,
   hideAllDropdowns,
   removeAllMenuButtonHighlights,
   isDesktopView
};
