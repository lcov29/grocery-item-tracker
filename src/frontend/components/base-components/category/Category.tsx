import React, { ReactElement, useState } from 'react';
import dropdownCollapseIcon from '../../../icons/arrowDownIcon.svg';
import dropdownUnfoldedIcon from '../../../icons/arrowUpIcon.svg';
import './category.css';


type CategoryProps = {
   name: string,
   additionalText?: string,
   isTopLevel?: boolean,
   isContentLevel?: boolean,
   contentList: ReactElement[]
};


function Category(props: CategoryProps): ReactElement {
   const { name, additionalText = ' ', isTopLevel = false, isContentLevel = false, contentList = [] } = props;
   const [isContentSectionCollapsed, setIsContentSectionCollapsed] = useState(true);


   function isRenderable(): boolean {
      return contentList.length > 0;
   }


   function createIcon(): ReactElement | null {
      if (isRenderable()) {
         return <img src={isContentSectionCollapsed ? dropdownCollapseIcon : dropdownUnfoldedIcon} alt="icon" />;
      }
      return null;
   }


   function buildContentCollapseButton(): ReactElement | null {
      if (isRenderable()) {
         return (
            <button
               type="button"
               className="category-content-collapse-button"
               onClick={() => { setIsContentSectionCollapsed(!isContentSectionCollapsed); }}
            >
               {createIcon()}
            </button>
         );
      }
      return null;
   }


   function buildContentSection():ReactElement | null {
      const isRenderNecessary = isRenderable() && !isContentSectionCollapsed;
      if (isRenderNecessary) {
         return <div className={(isContentLevel) ? 'content-section' : ''}>{contentList}</div>;
      }
      return null;
   }


   return (
      <div className={(isTopLevel) ? 'category-container-top-level' : 'category-container-sub-level'}>
         <div className="category">
            <div className={`category-bar ${(isTopLevel) ? 'category-bar-top-level' : 'category-bar-sub-level'}`}>
               <div className="category-name">{name}</div>
               <div className="category-additional-text">{additionalText}</div>
               { buildContentCollapseButton() }
            </div>
            { buildContentSection() }
         </div>
      </div>
   );
}


export { Category };
