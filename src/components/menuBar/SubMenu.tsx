import React, { ReactElement } from 'react';


type SubEntryListType = {
   text: string;
   action: string;
};


type SubMenuProps = {
   id: string;
   key: number;
   subEntryList?: SubEntryListType[];
};


function hideDropdown(): void {
   const menuDropdownList = document.getElementsByClassName('menuDropdown');
   for (let i = 0; i < menuDropdownList.length; i++) {
      menuDropdownList[i].classList.add('invisible');
      menuDropdownList[i].classList.add('unrender');
   }
}


function SubMenu(props: SubMenuProps): ReactElement {
   const { id, key, subEntryList } = props;
   let buttonList: any;

   if (subEntryList) {
      buttonList = subEntryList.map((subEntry, index) => <button key={index} type="button">{subEntry.text}</button>);
   }

   return (
      <div id={id} key={key} className="invisible unrender menuDropdown" onMouseLeave={hideDropdown}>
         {buttonList}
      </div>
   );

}


export { SubMenu, hideDropdown, SubEntryListType };
