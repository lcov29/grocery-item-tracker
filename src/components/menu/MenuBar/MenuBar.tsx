import React, { ReactElement, useState, useEffect } from 'react';
import { isDesktopView } from '../menuFunctions';
import './menuBar.css';


type MenuBarProps = {
   menuEntryList: ReactElement[]
};


function MenuBar(props: MenuBarProps): ReactElement {

   const { menuEntryList } = props;
   const isDesktop = isDesktopView(window.innerWidth);

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
         // implement closing all open dropdowns;
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
         return <div className="menu-container">{ menuEntryList }</div>;
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
