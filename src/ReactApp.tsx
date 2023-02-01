import React, { ReactElement, useState } from 'react';
import { routeContentSection, pageId } from './routing/routing';
import { NavigationBar } from './frontend/components/application-components/navigationBar/NavigationBar';
import './reactApp.css';


function ReactApp(): ReactElement {
   const [currentPageId, setCurrentPageId] = useState(pageId.home);

   return (
      <>
         <NavigationBar currentPageId={currentPageId} setCurrentPageId={setCurrentPageId} />
         <main>
            { routeContentSection(currentPageId) }
         </main>
      </>
   );
}


export { ReactApp };
