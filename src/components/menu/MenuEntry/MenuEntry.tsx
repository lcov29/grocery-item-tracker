import React, { MouseEvent, ChangeEvent, ReactElement } from 'react';
import { isDesktopView } from '../menuFunctions';
import './menuEntry-style.css';


type MenuEntryProps = {
   id: string,
   button: {
      text: string,
      action?: () => void
   },
   dropdown?: ReactElement
};


type ButtonFocusEvent = ChangeEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>;


type MenuButtonEvent = ButtonFocusEvent | MouseEvent<HTMLButtonElement>;


type MenuButtonClickHandlerParams = {
   event: MouseEvent<HTMLButtonElement>,
   customEventHandler?: () => void
};


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
   hideAllDropdowns();
   showDropdown(dropdown);
}


function handleMenuButtonHover(event: ButtonFocusEvent): void {
   if (isDesktopView(window.innerWidth)) {
      handleMenuButtonInteraction(event);
   }
}


function handleMenuButtonClick(param: MenuButtonClickHandlerParams): void {
   const { event, customEventHandler } = param;

   if (!isDesktopView(window.innerWidth)) {
      handleMenuButtonInteraction(event);
   }

   if (customEventHandler) {
      customEventHandler();
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
   const { id, button, dropdown } = props;

   return (
      <div className="menu-entry">
         <button
            id={id}
            type="button"
            className={`menu-entry-button ${(dropdown) ? 'menu-entry-with-dropdown' : ''}`}
            onClick={(event) => handleMenuButtonClick({ event, customEventHandler: button.action })}
            onFocus={handleMenuButtonHover}
            onMouseOver={handleMenuButtonHover}
         >
            {button.text}
         </button>
         {createDropdown(dropdown)}
      </div>
   );
}


export { MenuEntry, hideAllDropdowns };
