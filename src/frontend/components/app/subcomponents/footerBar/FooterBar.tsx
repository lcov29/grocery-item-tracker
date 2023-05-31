import React, { ReactElement } from 'react';
import githubIcon from '../../../../icons/githubIcon.svg';
import './footerBar.css';


function FooterBar(): ReactElement {
   return (
      <footer>
         <div>Grocery Item Tracker</div>
         <div>Version 0.1</div>
         <a href="https://github.com/voss29" target="_blank" rel="noreferrer">
            <img
               src={githubIcon}
               alt="GitHub"
               width="20px"
               height="20px"
            />
         </a>
      </footer>
   );
}


export { FooterBar };
