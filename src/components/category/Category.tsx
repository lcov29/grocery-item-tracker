import React, { ReactElement } from 'react';
import './category-style.css';


type CategoryProps = {
   name: string,
   additionalText?: string,
   isTopLevel?: boolean,
   contentList?: ReactElement[],
};


function isRenderable(contentList?: ReactElement[]): boolean {
   if (contentList) {
      return contentList.length > 0;
   }
   return false;
}


function generateContentSectionId(categoryName: string): string {
   return `${categoryName}-content-section`;
}


function buildAdditionalTextElement(additionalText?: string): ReactElement | null {
   if (additionalText) {
      return <div className="additionalText">{additionalText}</div>;
   }
   return null;
}


function buildContentSectionElement(categoryName: string, contentSectionList?: ReactElement[]):
ReactElement | null {
   if (isRenderable(contentSectionList)) {
      return (
         <div id={generateContentSectionId(categoryName)} className="contentSection">
            {contentSectionList}
         </div>
      );
   }
   return null;
}


function buildContentCollapseButton(categoryName: string, contentList?: ReactElement[]):
ReactElement | null {
   if (isRenderable(contentList)) {
      const buttonId = `${categoryName}-content-collapse-button`;
      return (
         <button
            id={buttonId}
            type="button"
            className="contentSectionCollapseButton"
            onClick={() => {
               const collapseButton = document.getElementById(buttonId);
               const subcategoryListId = generateContentSectionId(categoryName);
               const subcategoryListElement = document.getElementById(subcategoryListId);

               if (!collapseButton || !subcategoryListElement) { return; }

               const isListCollapsed = subcategoryListElement.classList.contains('invisible');
               collapseButton.innerText = (isListCollapsed) ? '^' : 'V';
               subcategoryListElement.classList.toggle('invisible');
            }}
         >
            ^
         </button>
      );
   }
   return null;
}


function Category(props: CategoryProps): ReactElement {
   const { name, additionalText = ' ', isTopLevel = false, contentList } = props;
   return (
      <div className={(isTopLevel) ? 'categoryContainerTopLevel' : 'categoryContainerSubLevel'}>
         <div className="category">
            <div className={`categoryBar ${(isTopLevel) ? 'categoryBarTopLevel' : 'categoryBarSubLevel'}`}>
               <div className="categoryName">{name}</div>
               { buildAdditionalTextElement(additionalText) }
               { buildContentCollapseButton(name, contentList) }
            </div>
            { buildContentSectionElement(name, contentList) }
         </div>
      </div>
   );
}


export { Category };
