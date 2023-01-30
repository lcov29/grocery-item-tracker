import React, { ReactElement } from 'react';
import { MenuBar } from '../../components/base-components/menuBar/MenuBar';
import { MenuGroceryOptionDropdownContent } from '../../components/application-components/menuGroceryOptionDropdownContent/MenuGroceryOptionDropdownContent';
import homeIcon from '../../icons/homeIcon.svg';
import groceryItemIcon from '../../icons/groceryItemIcon.svg';
import shoppingListIcon from '../../icons/shoppingCartIcon.svg';
import reportsIcon from '../../icons/reportIcon.svg';
import settingsIcons from '../../icons/settingIcon.svg';
import './template.css';


function createIcon(src: string, alt: string): ReactElement {
   return <img src={src} alt={alt} width="35px" height="35px" />;
}


function Template(props: { content: ReactElement }): ReactElement {
   const { content } = props;


   const menuEntryList = [
      { button: { content: createIcon(homeIcon, 'Home'), action: () => {} } },
      {
         button: { content: createIcon(groceryItemIcon, 'Grocery Items') },
         dropdown: <MenuGroceryOptionDropdownContent />
      },
      { button: { content: createIcon(shoppingListIcon, 'Shopping List'), action: () => {} } },
      { button: { content: createIcon(reportsIcon, 'Reports'), action: () => {} } },
      { button: { content: createIcon(settingsIcons, 'Settings'), action: () => {} } }
   ];


   return (
      <>
         <header>
            <MenuBar menuEntryList={menuEntryList} />
         </header>
         <main>
            { content }
         </main>
      </>
   );
}


export { Template };
