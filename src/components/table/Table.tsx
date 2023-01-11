import React, { ReactElement } from 'react';
import './table-style.css';


type TableProps = {
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


function Table(props: TableProps): ReactElement {
   const { headerList, rowList } = props;

   return (
      <table key="table" className="itemTable">
         { buildTableHeader(headerList) }
         { buildTableBody(rowList) }
      </table>
   );
}


export { Table };
