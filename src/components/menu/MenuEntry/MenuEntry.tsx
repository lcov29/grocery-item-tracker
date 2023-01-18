import React, { MouseEvent, ChangeEvent, ReactElement } from 'react';
import { isDesktopView } from '../menuFunctions';
import './menuEntry-style.css';


type MenuEntryProps = {
   button: {
      text: string,
      action?: () => void
   },
   dropdown?: ReactElement
};

type ButtonFocusEvent = ChangeEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>;

type MenuButtonEvent = ButtonFocusEvent | MouseEvent<HTMLButtonElement>;


function removeAllMenuButtonHighlights() {
   const menuButtonList = document.querySelectorAll<HTMLElement>('.menu-entry-button');
   menuButtonList.forEach((menuButton) => menuButton.classList.remove('active'));
}


function addMenuButtonHightlight(menuButton: HTMLElement) {
   menuButton.classList.add('active');
}


function hideAllDropdowns(): void {
   const dropdownList = document.querySelectorAll<HTMLElement>('.menu-entry-dropdown');
   dropdownList.forEach((dropdown) => dropdown.classList.remove('visible'));
}


function showDropdown(dropdown: HTMLElement | undefined) {
   if (dropdown) {
      dropdown.classList.add('visible');
   }
}


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


function createDropdown(dropdownContent: ReactElement | undefined): ReactElement | null {
   if (dropdownContent) {
      return (
         <div className="menu-entry-dropdown" onMouseLeave={hideAllDropdowns}>
            {dropdownContent}
         </div>
      );
   }
   return null;
}


function MenuEntry(props: MenuEntryProps): ReactElement {
   const { button, dropdown } = props;

   return (
      <div className="menu-entry">
         <button
            type="button"
            className="menu-entry-button"
            onClick={(event) => {
               handleMenuButtonClick(event);
            }}
            onFocus={handleMenuButtonHover}
            onMouseOver={handleMenuButtonHover}
         >
            {button.text}
         </button>
         {createDropdown(dropdown)}
      </div>
   );
}


export { MenuEntry, hideAllDropdowns, removeAllMenuButtonHighlights };
