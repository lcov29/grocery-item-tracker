import React, { ReactElement } from 'react';
import { removeAllMenuButtonHighlights, hideAllDropdowns } from '../menuFunctions';
import './menuBar-style.css';


type MenuBarProps = {
   menuEntryList: ReactElement[]
};


function showMenuBar() {
   document.getElementsByClassName('menu-container')[0].classList.remove('hidden');
}


function hideMenuBar() {
   document.getElementsByClassName('menu-container')[0].classList.add('hidden');
}


function handleNavigationBarMouseLeave() {
   removeAllMenuButtonHighlights();
   hideAllDropdowns();
   hideMenuBar();
}


function MenuBar(props: MenuBarProps): ReactElement {
   const { menuEntryList } = props;
   return (
      <nav onMouseLeave={handleNavigationBarMouseLeave}>
         <button type="button" id="toggle-button" onClick={showMenuBar}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
         </button>
         <div className="menu-container hidden">
            { menuEntryList }
         </div>
      </nav>
   );
}


export { MenuBar };
