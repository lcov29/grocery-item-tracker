import React, { ReactElement } from 'react';
import './item-style.css';


type ItemProps = {
   contentList: string[],
   actionButtonList?: ReactElement[]
};


function Item(props: ItemProps): ReactElement {
   const { contentList, actionButtonList } = props;

   return (
      <div className="itemBar">
         { contentList.map((content, index) => <div key={index}>{content}</div>) }
         { actionButtonList }
      </div>
   );
}


export { Item };
