import React, { ReactElement } from 'react';
import { pageId } from '../../../../routing/routing';
import './supplyOptionDropdownContent.css';


type Props = {
   setCurrentPageId: (name: string) => void
};


function SupplyOptionDropdownContent(props: Props): ReactElement {
   const { setCurrentPageId } = props;
   return (
      <div className="menu-grocery-dropdown-content">
         <div className="menu-grocery-dropdown-content-title">Supply</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => { setCurrentPageId(pageId.grocerySupplyOverview); }}>
               Overview
            </button>
            <button type="button" onClick={() => { setCurrentPageId(pageId.grocerySupplyMinimum); }}>
               Minimum
            </button>
         </div>
         <div className="menu-grocery-dropdown-content-title last-title">Grocery Items</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => { setCurrentPageId(pageId.groceryItemAdd); }}>
               Add
            </button>
            <button type="button" onClick={() => { setCurrentPageId(pageId.groceryItemConsume); }}>
               Consume
            </button>
         </div>
      </div>
   );
}


export { SupplyOptionDropdownContent };
