import React, { ReactElement, useState } from 'react';
import { isDesktopView } from '../menuFunctions';
import './menuEntry.css';


type MenuEntryProps = {
   id: string,
   button: {
      text: string,
      action?: () => void
   },
   dropdown?: ReactElement
};


function MenuEntry(props: MenuEntryProps): ReactElement {

   const { id, button, dropdown } = props;
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);


   function handleMenuButtonClick(): void {
      if (!isDesktopView(window.innerWidth)) {
         setIsDropdownVisible(!isDropdownVisible);
      }

      if (button.action) {
         button.action();
      }
   }


   function handleMenuButtonMouseEnter(): void {
      if (isDesktopView(window.innerWidth)) {
         setIsDropdownVisible(true);
      }
   }


   function handleDropdownMouseLeave(): void {
      setIsDropdownVisible(false);
   }


   function createDropdown(): ReactElement | null {
      const isDropdownRenderable = dropdown && isDropdownVisible;
      if (isDropdownRenderable) {
         return (
            <div className="menu-entry-dropdown" onMouseLeave={handleDropdownMouseLeave}>
               {dropdown}
            </div>
         );
      }
      return null;
   }


   return (
      <div className="menu-entry">
         <button
            id={id}
            type="button"
            className={`menu-entry-button ${(dropdown) ? 'menu-entry-with-dropdown' : ''}`}
            onClick={handleMenuButtonClick}
            onMouseEnter={handleMenuButtonMouseEnter}
         >
            {button.text}
         </button>
         {createDropdown()}
      </div>
   );

}


export { MenuEntry };
