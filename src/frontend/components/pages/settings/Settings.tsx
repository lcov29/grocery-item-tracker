/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { Counter } from '../../base-components/counter/Counter';
import './settings.css';


function Settings(): ReactElement {
   const [expirationWarningDayLimit, setExpirationWarningDayLimit] = useState(7);
   return (
      <main className="setting-main">
         <div className="setting-page-container">
            <div>
               <h2>Settings</h2>
               <div className="setting-container">
                  <label>Expiration Warning Limit</label>
                  <Counter
                     value={expirationWarningDayLimit}
                     setValue={setExpirationWarningDayLimit}
                     minimum={1}
                     maximum={30}
                  />
               </div>
               <div className="setting-container">
                  <label htmlFor="language-setting">Language</label>
                  <select id="language-setting" name="language-setting">
                     <option value="English">English</option>
                     <option value="German">German</option>
                  </select>
               </div>
               <div className="setting-container">
                  <label htmlFor="currency-setting">Currency</label>
                  <select id="currency-setting" name="currency-setting">
                     <option value="Dollar">$ (US-Dollar)</option>
                     <option value="Euro">€ (Euro)</option>
                     <option value="Pound">&#163; (Pound)</option>
                  </select>
               </div>
               <div className="setting-container">
                  <label htmlFor="database-setting">Database</label>
                  <select id="database-setting" name="database-selection">
                     <option value="MariaDB">MariaDB</option>
                     <option value="IndexedDB">IndexedDB</option>
                  </select>
               </div>
            </div>
         </div>
      </main>
   );

}


export { Settings };
