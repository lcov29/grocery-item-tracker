import React, { ReactElement, useState, useEffect } from 'react';
import { routeContentSection, pageId } from '../../routing/routing';
import { NavigationBar } from './subcomponents/navigationBar/NavigationBar';
import { FooterBar } from './subcomponents/footerBar/FooterBar';
import './reactApp.css';


function ReactApp(): ReactElement {
   const [currentPageId, setCurrentPageId] = useState(pageId.home);


   function handlePopState() {
      // handle navigating history
      const nextPageId = window.location.hash.replace('#', '');
      setCurrentPageId(nextPageId);
   }


   useEffect(() => {
      window.location.hash = pageId.home;
      window.addEventListener('popstate', handlePopState);

      return function cleanUp() {
         window.removeEventListener('popstate', handlePopState);
      };
   }, []);


   return (
      <>
         <NavigationBar currentPageId={currentPageId} setCurrentPageId={setCurrentPageId} />
         {routeContentSection(currentPageId)}
         <FooterBar />
      </>
   );
}


export { ReactApp };
