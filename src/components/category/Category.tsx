import React, { ReactElement, useState } from 'react';
import './category.css';


type CategoryProps = {
   name: string,
   additionalText?: string,
   isTopLevel?: boolean,
   contentList?: ReactElement[]
};


function Category(props: CategoryProps): ReactElement {
   const { name, additionalText = ' ', isTopLevel = false, contentList } = props;
   const [isContentSectionCollapsed, setIsContentSectionCollapsed] = useState(true);


   function isRenderable(): boolean {
      if (contentList) {
         return contentList.length > 0;
      }
      return false;
   }


   function buildContentCollapseButton(): ReactElement | null {
      if (isRenderable()) {
         return (
            <button
               type="button"
               className={`toggle-button ${(isContentSectionCollapsed) ? '' : 'toggle-button-unfolded'}`}
               onClick={() => { setIsContentSectionCollapsed(!isContentSectionCollapsed); }}
            />
         );
      }
      return null;
   }


   function buildContentSection():ReactElement | null {
      if (isRenderable() && !isContentSectionCollapsed) {
         return <div className="content-section">{contentList}</div>;
      }
      return null;
   }


   return (
      <div className={(isTopLevel) ? 'category-container-top-level' : 'category-container-sub-level'}>
         <div className="category">
            <div className={`category-bar ${(isTopLevel) ? 'category-bar-top-level' : 'category-bar-sub-level'}`}>
               <div className="category-name">{name}</div>
               <div className="additionalText">{additionalText}</div>
               { buildContentCollapseButton() }
            </div>
            { buildContentSection() }
         </div>
      </div>
   );
}


export { Category };
