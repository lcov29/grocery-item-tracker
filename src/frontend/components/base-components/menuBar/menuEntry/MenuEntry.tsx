import React, { ReactElement } from 'react';
import { isDesktopView } from '../menuFunctions';
import dropdownCollapseIcon from '../../../../icons/arrowDownWhiteIcon.svg';
import dropdownUnfoldedIcon from '../../../../icons/arrowUpWhiteIcon.svg';
import './menuEntry.css';


type MenuEntryCoreProps = {
   button: {
      content: string | ReactElement,
      action?: () => void,
   },
   dropdown?: ReactElement,
   isActive?: boolean
};


type MenuEntryAdditionalProps = {
   id: string,
   idDropdownVisible: string,
   setIdDropdownVisible: (id: string) => void
};


function MenuEntry(props: MenuEntryCoreProps & MenuEntryAdditionalProps): ReactElement {

   const { id, button, dropdown, setIdDropdownVisible, idDropdownVisible, isActive } = props;


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


   function createIcon(): ReactElement | null {
      if (dropdown === undefined) return null;

      return <img src={isDropdownVisible() ? dropdownUnfoldedIcon : dropdownCollapseIcon} alt="" />;
   }


   function createMenuEntryButton(): ReactElement {
      return (
         <button
            id={id}
            type="button"
            className={`menu-entry-button ${isActive ? 'active-menu-entry' : ''}`}
            onClick={handleMenuButtonClick}
            onMouseEnter={handleMenuButtonMouseEnter}
         >
            {button.content}
            {createIcon()}
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
