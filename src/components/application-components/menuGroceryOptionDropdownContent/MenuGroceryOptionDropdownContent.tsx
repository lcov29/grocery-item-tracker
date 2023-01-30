import React, { ReactElement } from 'react';
import './menuGroceryOptionDropdownContent.css';


function MenuGroceryOptionDropdownContent(): ReactElement {
   return (
      <div className="menu-grocery-dropdown-content">
         <div className="menu-grocery-dropdown-content-title">Supply</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => {}}>Overview</button>
            <button type="button" onClick={() => {}}>Minimum</button>
         </div>
         <div className="menu-grocery-dropdown-content-title last-title">Grocery Items</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => {}}>Add</button>
            <button type="button" onClick={() => {}}>Consume</button>
         </div>
      </div>
   );
}


export { MenuGroceryOptionDropdownContent };
