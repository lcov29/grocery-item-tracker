import React, { ReactElement } from 'react';
import './table-style.css';


type TableProps = {
   headerList: string[]
   rowList: (string | ReactElement)[][],
};


function buildTableDataField(data: string | ReactElement, keyValue: number): ReactElement {
   const isString = typeof data === 'string';
   const className = (isString) ? '' : 'reactElementField';
   return <td key={keyValue} className={className}>{data}</td>;
}


function buildTableRow(index: number, rowDataList: (string | ReactElement)[]): ReactElement {
   return (
      <tr key={index}>
         {rowDataList.map((data, columnIndex) => buildTableDataField(data, columnIndex))}
      </tr>
   );
}


function buildTableBody(rowList: (string | ReactElement)[][]): ReactElement {
   return <tbody>{rowList.map((rowData, index) => buildTableRow(index, rowData))}</tbody>;
}


function buildTableHeader(headerList: string[]): ReactElement {
   return (
      <thead>
         <tr key="header">{headerList.map((header, index) => <th key={index}>{header}</th>)}</tr>
      </thead>
   );
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
