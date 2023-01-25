import React, { ReactElement, useState, useEffect } from 'react';
import { MenuEntry, MenuEntryCoreProps } from './menuEntry/MenuEntry';
import { isDesktopView } from './menuFunctions';
import './menuBar.css';


type MenuBarProps = {
   menuEntryList: MenuEntryCoreProps[]
};


function MenuBar(props: MenuBarProps): ReactElement {

   const { menuEntryList } = props;
   const isDesktop = isDesktopView(window.innerWidth);

   const [idDropdownVisible, setIdDropdownVisible] = useState('');
   const [isMenuContainerVisible, setIsMenuContainerVisible] = useState(isDesktop);
   const [isToggleButtonVisible, setIsToggleButtonVisible] = useState(!isDesktop);
   const [isToggleButtonCollapsed, setIsToggleButtonCollapsed] = useState(true);


   function handleNavigationBarResize() {
      setIsMenuContainerVisible(isDesktopView(window.innerWidth));
      setIsToggleButtonVisible(!isDesktopView(window.innerWidth));
      setIsToggleButtonCollapsed(true);
   }


   useEffect(() => {
      window.addEventListener('resize', handleNavigationBarResize);

      return function cleanUp() {
         window.removeEventListener('resize', handleNavigationBarResize);
      };
   }, []);


   function handleNavigationBarMouseLeave() {
      if (isDesktopView(window.innerWidth)) {
         setIdDropdownVisible('');
      }
   }


   function handleToggleButtonClick() {
      setIsMenuContainerVisible(!isMenuContainerVisible);
      setIsToggleButtonCollapsed(!isToggleButtonCollapsed);
   }


   function createToggleButton(): ReactElement | null {
      if (!isToggleButtonVisible) return null;

      return (
         <button type="button" className="toggle-button" onClick={handleToggleButtonClick}>
            {
               (isToggleButtonCollapsed) ? (
                  <div className="collapsed-icon">
                     <span className="bar" />
                     <span className="bar" />
                     <span className="bar" />
                  </div>
               ) : (
                  <div className="unfolded-icon">X</div>
               )
            }
         </button>
      );
   }


   function createMenuContainer(): ReactElement | null {
      if (isMenuContainerVisible) {
         return (
            <div className="menu-container">
               {
                  menuEntryList.map((entry, index) => (
                     <MenuEntry
                        id={`entry-${index}`}
                        button={entry.button}
                        dropdown={entry.dropdown}
                        idDropdownVisible={idDropdownVisible}
                        setIdDropdownVisible={setIdDropdownVisible}
                     />
                  ))
               }
            </div>
         );
      }
      return null;
   }


   return (
      <nav onMouseLeave={handleNavigationBarMouseLeave}>
         {createToggleButton()}
         {createMenuContainer()}
      </nav>
   );

}


export { MenuBar };
