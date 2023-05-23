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
            <button type="button" onClick={() => { setCurrentPageId(pageId.supplyOverview); }}>
               Overview
            </button>
            <button type="button" onClick={() => { setCurrentPageId(pageId.supplyMinimum); }}>
               Minimum
            </button>
         </div>
         <div className="menu-grocery-dropdown-content-title last-title">Grocery Items</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button type="button" onClick={() => { setCurrentPageId(pageId.addSupplyItems); }}>
               Add
            </button>
            <button type="button" onClick={() => { setCurrentPageId(pageId.consumeSupplyItems); }}>
               Consume
            </button>
         </div>
      </div>
   );
}


export { SupplyOptionDropdownContent };
