import React, { ReactElement } from 'react';

type Props = {
   icon: string,
   alternativeText: string,
   title?: string
};


function NavigationIcon(props: Props): ReactElement {
   const { icon, alternativeText, title } = props;
   return <img src={icon} alt={alternativeText} title={title} width="35px" height="35px" />;
}


export { NavigationIcon };
