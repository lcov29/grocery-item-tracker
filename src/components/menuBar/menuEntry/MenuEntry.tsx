import React, { ReactElement } from 'react';
import { isDesktopView } from '../menuFunctions';
import './menuEntry.css';


type MenuEntryCoreProps = {
   button: {
      text: string,
      action?: () => void
   },
   dropdown?: ReactElement
};


type MenuEntryAdditionalProps = {
   id: string,
   idDropdownVisible: string,
   setIdDropdownVisible: (id: string) => void
};


function MenuEntry(props: MenuEntryCoreProps & MenuEntryAdditionalProps): ReactElement {

   const { id, button, dropdown, setIdDropdownVisible, idDropdownVisible } = props;


   function isDropdownVisible(): boolean {
      return id === idDropdownVisible;
   }


   function handleMenuButtonClick(): void {
      if (!isDesktopView(window.innerWidth)) {
         setIdDropdownVisible(id);
      }

      if (button.action) {
         button.action();
      }
   }


   function handleMenuButtonMouseEnter(): void {
      if (isDesktopView(window.innerWidth)) {
         setIdDropdownVisible(id);
      }
   }


   function handleDropdownMouseLeave(): void {
      setIdDropdownVisible('');
   }


   function getDropdownButtonClassName(): string {
      if (!dropdown) return 'no-dropdown';

      if (isDropdownVisible()) {
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
      const isDropdownRenderable = dropdown && isDropdownVisible();
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


export { MenuEntry, MenuEntryCoreProps };
