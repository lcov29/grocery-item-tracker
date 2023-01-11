import React from 'react';
import { Table } from './Table';

describe('<Table />', () => {


   it('renders', () => {
      const headerList = ['Header1', 'Header2', 'Header3', 'Header4'];
      const rowList = [
         ['data1.1', 'data1.2', 'data1.3', 'data1.4'],
         ['data2.1', 'data2.2', 'data2.3', 'data2.4']
      ];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);
   });


   it('displays user defined column headers', () => {
      const headerList = ['Header1', 'Header2', 'Header3', 'Header4'];
      const rowList = [
         ['data1.1', 'data1.2', 'data1.3', 'data1.4'],
         ['data2.1', 'data2.2', 'data2.3', 'data2.4']
      ];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);

      cy.get('thead > tr > :nth-child(1)').should('have.text', 'Header1');
      cy.get('thead > tr > :nth-child(2)').should('have.text', 'Header2');
      cy.get('thead > tr > :nth-child(3)').should('have.text', 'Header3');
      cy.get('thead > tr > :nth-child(4)').should('have.text', 'Header4');
   });


   it('displays user defined table rows', () => {
      const headerList = ['Header1', 'Header2', 'Header3', 'Header4'];
      const rowList = [
         ['data1.1', 'data1.2', 'data1.3', 'data1.4'],
         ['data2.1', 'data2.2', 'data2.3', 'data2.4']
      ];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);

      // first row
      cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.text', 'data1.1');
      cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.text', 'data1.2');
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'data1.3');
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('have.text', 'data1.4');

      // second row
      cy.get('tbody > :nth-child(2) > :nth-child(1)').should('have.text', 'data2.1');
      cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'data2.2');
      cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'data2.3');
      cy.get('tbody > :nth-child(2) > :nth-child(4)').should('have.text', 'data2.4');
   });


   it('does not display headers for data exceeding the number of headers', () => {
      const headerList = ['Header1', 'Header2', 'Header3', 'Header4'];
      const rowList = [
         ['data1.1', 'data1.2', 'data1.3', 'data1.4', 'data1.5'],
         ['data2.1', 'data2.2', 'data2.3', 'data2.4', 'data2.5']
      ];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);
      cy.get('thead > tr > :nth-child(5)').should('not.exist');
   });


   it('does not display data columns for headers exceeding the number of data row columns', () => {
      const headerList = ['Header1', 'Header2', 'Header3', 'Header4'];
      const rowList = [
         ['data1.1', 'data1.2', 'data1.3'],
         ['data2.1', 'data2.2', 'data2.3']
      ];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('not.exist');
   });


   it('displays ReactElements as data columns', () => {
      const headerList = ['Header1', 'Header2'];
      const rowList = [['data', <button type="button">Click</button>]];
      cy.mount(<Table headerList={headerList} rowList={rowList} />);
      cy.get('button').should('exist');
   });

});
