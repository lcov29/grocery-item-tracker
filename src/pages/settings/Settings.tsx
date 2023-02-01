/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import { Counter } from '../../components/base-components/counter/Counter';
import { Template } from '../template/Template';
import './settings.css';


function Settings(): ReactElement {
   const content = (
      <div id="setting-page-container">
         <div>
            <h2>Settings</h2>
            <div className="setting-container">
               <label htmlFor="expiration-warning-setting">Expiration Warning Limit</label>
               <Counter value={7} suffix="Days" minimum={1} maximum={30} />
            </div>
            <div className="setting-container">
               <label htmlFor="language-setting">Language</label>
               <select name="language-setting">
                  <option value="English">English</option>
                  <option value="German">German</option>
               </select>
            </div>
            <div className="setting-container">
               <label htmlFor="currency-setting">Currency</label>
               <select name="currency-setting">
                  <option value="Dollar">$ (US-Dollar)</option>
                  <option value="Euro">€ (Euro)</option>
                  <option value="Pound">&#163; (Pound)</option>
               </select>
            </div>
            <div className="setting-container">
               <label htmlFor="database-setting">Database</label>
               <select name="database-selection">
                  <option value="MariaDB">MariaDB</option>
                  <option value="IndexedDB">IndexedDB</option>
               </select>
            </div>
         </div>
      </div>
   );

   return <Template content={content} />;
}


export { Settings };
