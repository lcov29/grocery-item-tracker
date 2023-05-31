import React, { ReactElement } from 'react';
import { pageId } from '../../../../../../routing/routing';
import { NavigationIcon } from '../../../NavigationIcon';
import supplyOverviewIcon from '../../../../../../icons/supplyIcon.svg';
import itemAddIcon from '../../../../../../icons/itemAddIcon.svg';
import itemRemoveIcon from '../../../../../../icons/itemRemoveIcon.svg';
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
            <button
               type="button"
               title="Supply Details"
               onClick={() => { setCurrentPageId(pageId.supplyOverview); }}
            >
               <NavigationIcon icon={supplyOverviewIcon} alternativeText="Current Supply" />
            </button>
         </div>
         <div className="menu-grocery-dropdown-content-title last-title">Grocery Items</div>
         <div className="menu-grocery-dropdown-content-suboptions">
            <button
               type="button"
               title="Add Items"
               onClick={() => { setCurrentPageId(pageId.addSupplyItems); }}
            >
               <NavigationIcon icon={itemAddIcon} alternativeText="Add Items" />
            </button>
            <button
               type="button"
               title="Consume Items"
               onClick={() => { setCurrentPageId(pageId.consumeSupplyItems); }}
            >
               <NavigationIcon icon={itemRemoveIcon} alternativeText="Consume Items" />
            </button>
         </div>
      </div>
   );
}


export { SupplyOptionDropdownContent };
