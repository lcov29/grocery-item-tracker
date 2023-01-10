import React, { ReactElement } from 'react';


type ItemTableProps = {
   headerList: string[]
   rowList: (string | ReactElement)[][],
};


function buildTableHeader(headerList: string[]): ReactElement {
   return (
      <thead>
         <tr key="header">{headerList.map((header, index) => <th key={index}>{header}</th>)}</tr>
      </thead>
   );
}


function buildTableRow(index: number, rowDataList: (string | ReactElement)[]): ReactElement {
   return (
      <tr key={index}>
         {rowDataList.map((data, columnIndex) => <td key={columnIndex}>{data}</td>)}
      </tr>
   );
}


function buildTableBody(rowList: (string | ReactElement)[][]): ReactElement {
   return <tbody>{rowList.map((rowData, index) => buildTableRow(index, rowData))}</tbody>;
}


function ItemTable(props: ItemTableProps): ReactElement {
   const { headerList, rowList } = props;

   return (
      <table key="table">
         { buildTableHeader(headerList) }
         { buildTableBody(rowList) }
      </table>
   );
}


export { ItemTable };
