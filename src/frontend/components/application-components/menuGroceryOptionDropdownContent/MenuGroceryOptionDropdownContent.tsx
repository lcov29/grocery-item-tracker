import React, { ReactElement } from 'react';
import './menuGroceryOptionDropdownContent.css';


type Props = {
   setCurrentPageId: (name: string) => void
};


function MenuGroceryOptionDropdownContent(props: Props): ReactElement {
   const { setCurrentPageId } = props;
   return (
      <div className="menu-grocery-dropdown-content">
         <div className="menu-grocery-dropdown-content-title">Supply</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => { setCurrentPageId('GrocerySupplyOverview'); }}>
               Overview
            </button>
            <button type="button" onClick={() => { setCurrentPageId('GrocerySupplyMinimum'); }}>
               Minimum
            </button>
         </div>
         <div className="menu-grocery-dropdown-content-title last-title">Grocery Items</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => { setCurrentPageId('GroceryItemAdd'); }}>
               Add
            </button>
            <button type="button" onClick={() => { setCurrentPageId('GroceryItemConsume'); }}>
               Consume
            </button>
         </div>
      </div>
   );
}


export { MenuGroceryOptionDropdownContent };
