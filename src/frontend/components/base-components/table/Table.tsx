import React, { ReactElement } from 'react';
import './table.css';


type TableProps = {
   headerList: string[],
   rowList: (string | ReactElement)[][],
   keyList?: string[],
   handleRowClick?: (key: string) => void
};


function Table(props: TableProps): ReactElement {
   const { headerList, rowList, keyList = [], handleRowClick } = props;


   function buildTableHeader(): ReactElement {
      return (
         <thead>
            <tr key="header">{headerList.map((header, index) => <th key={index}>{header}</th>)}</tr>
         </thead>
      );
   }


   function handleTableRowClick(index: number): void {
      if (handleRowClick) {
         const key = keyList[index];
         handleRowClick(key);
      }
   }


   function buildTableDataField(data: string | ReactElement, keyValue: number): ReactElement {
      const isString = typeof data === 'string';
      const className = (isString) ? '' : 'reactElementField';
      return <td key={keyValue} className={className}>{data}</td>;
   }


   function buildTableRow(index: number, rowDataList: (string | ReactElement)[]): ReactElement {
      const rowData = rowDataList.map(
         (data, columnIndex) => buildTableDataField(data, columnIndex)
      );

      const isClickable = handleRowClick !== undefined;
      if (isClickable) {
         return (
            <tr
               key={index}
               className="item-table-clickable-row"
               onClick={() => { handleTableRowClick(index); }}
            >
               {rowData}
            </tr>
         );
      }
      return <tr key={index}>{rowData}</tr>;
   }


   function buildTableBody(): ReactElement {
      return <tbody>{rowList.map((rowData, index) => buildTableRow(index, rowData))}</tbody>;
   }


   return (
      <table key="table" className="itemTable">
         { buildTableHeader() }
         { buildTableBody() }
      </table>
   );
}


export { Table };
