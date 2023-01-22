import React, { ReactElement, useState } from 'react';
import './tabArea.css';


type TabAreaProps = {
   entryList: { headline: string, content: ReactElement }[]
};


function TabArea(props: TabAreaProps): ReactElement {
   const { entryList } = props;
   const [activeAreaIndex, setActiveAreaIndex] = useState(0);

   function buildTabBar(): ReactElement {
      return (
         <div className="tab-bar">
            { entryList.map((entry, index) => (
               <button
                  key={index}
                  type="button"
                  className={(index === activeAreaIndex) ? ' tab active-tab' : 'tab'}
                  onClick={() => setActiveAreaIndex(index)}
               >
                  {entry.headline}
               </button>
            ))}
         </div>
      );
   }

   return (
      <div className="tab-area">
         { buildTabBar() }
         <div className="content-area">
            { entryList[activeAreaIndex].content }
         </div>
      </div>
   );
}


export { TabArea };
