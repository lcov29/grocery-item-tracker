import React, { ReactElement } from 'react';
import { handleMenuButtonHover, handleMenuButtonClick, hideAllDropdowns } from '../menuFunctions';
import './menuEntry-style.css';


type MenuEntryProps = {
   button: {
      text: string,
      action?: () => void
   },
   dropdown?: ReactElement
};


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


export { MenuEntry };
