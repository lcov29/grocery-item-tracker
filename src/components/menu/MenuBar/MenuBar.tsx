import React, { ReactElement } from 'react';
import { hideAllDropdowns } from '../MenuEntry/MenuEntry';
import { isDesktopView } from '../menuFunctions';
import './menuBar-style.css';


type MenuBarProps = {
   menuEntryList: ReactElement[]
};


const classNameHidden = 'hidden';


function toggleMenuCollapseButtonIcon() {
   const collapsedIconClassList = document.getElementsByClassName('collapsedIcon')[0].classList;
   const unfoldedIconClassList = document.getElementsByClassName('unfoldedIcon')[0].classList;
   const isMenuContainerHidden = document.getElementsByClassName('menu-container')[0].classList.contains(classNameHidden);

   if (isMenuContainerHidden) {
      collapsedIconClassList.remove(classNameHidden);
      unfoldedIconClassList.add(classNameHidden);
   } else {
      collapsedIconClassList.add(classNameHidden);
      unfoldedIconClassList.remove(classNameHidden);
   }
}


function toggleMenuVisibility() {
   document.getElementsByClassName('menu-container')[0].classList.toggle(classNameHidden);
}


function hideMenuBar() {
   document.getElementsByClassName('menu-container')[0].classList.add(classNameHidden);
}


function displayCollapsedButtonIcon() {
   document.getElementsByClassName('collapsedIcon')[0].classList.remove(classNameHidden);
   document.getElementsByClassName('unfoldedIcon')[0].classList.add(classNameHidden);
}


function handleNavigationBarMouseLeave() {
   if (isDesktopView(window.innerWidth)) {
      hideAllDropdowns();
      hideMenuBar();
      displayCollapsedButtonIcon();
   }
}


function handleToggleButtonClick() {
   toggleMenuVisibility();
   toggleMenuCollapseButtonIcon();
}


function MenuBar(props: MenuBarProps): ReactElement {
   const { menuEntryList } = props;
   return (
      <nav onMouseLeave={handleNavigationBarMouseLeave}>
         <button type="button" id="toggle-button" onClick={handleToggleButtonClick}>
            <div className="collapsedIcon">
               <span className="bar" />
               <span className="bar" />
               <span className="bar" />
            </div>
            <div className="unfoldedIcon hidden">
               X
            </div>
         </button>
         <div className="menu-container hidden">
            { menuEntryList }
         </div>
      </nav>
   );
}


export { MenuBar };
