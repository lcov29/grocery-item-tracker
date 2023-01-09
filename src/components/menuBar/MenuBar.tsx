import React, { ReactElement } from 'react';
import { MainButton } from './MainButton';
import { SubMenu, hideDropdown, SubEntryListType } from './SubMenu';
import './menuBar-style.css';


type MenuBarProps = {
   menuEntryList: {
      entryText: string,
      action?: string
      subEntryList?: SubEntryListType[]
   }[]
};


function MenuBar(props: MenuBarProps): ReactElement {
   const { menuEntryList } = props;
   const rootElement: HTMLElement | null = document.querySelector(':root');

   if (rootElement) {
      rootElement.style.setProperty('--columnCount', `${menuEntryList.length}`);
   }

   return (
      <div id="container" key="containerKey" onMouseLeave={hideDropdown}>
         {
            menuEntryList.map((menuEntry, index) => (
               <MainButton
                  id={`${menuEntry.entryText}-main`}
                  key={index}
                  dropdownId={(menuEntry.subEntryList) ? menuEntry.entryText : undefined}
                  text={menuEntry.entryText}
               />
            ))
         }
         {
            menuEntryList.map((menuEntry, index) => (
               <SubMenu
                  id={menuEntry.entryText}
                  key={index}
                  subEntryList={menuEntry.subEntryList}
               />
            ))
         }
      </div>
   );
}


export { MenuBar };
