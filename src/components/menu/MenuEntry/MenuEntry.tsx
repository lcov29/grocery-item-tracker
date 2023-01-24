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


   function getDropdownButtonClassName(): string {
      if (!dropdown) return 'no-dropdown';

      if (isDropdownVisible) {
         return 'unfolded-dropdown';
      }

      return 'collapsed-dropdown';
   }


   function createMenuEntryButton(): ReactElement {
      return (
         <button
            id={id}
            type="button"
            className={`menu-entry-button ${getDropdownButtonClassName()}`}
            onClick={handleMenuButtonClick}
            onMouseEnter={handleMenuButtonMouseEnter}
         >
            {button.text}
         </button>
      );
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
         {createMenuEntryButton()}
         {createDropdown()}
      </div>
   );

}


export { MenuEntry };
