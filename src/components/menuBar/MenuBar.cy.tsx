import React from 'react';
import { MenuBar } from './MenuBar';


describe('<MenuBar />', () => {

   const menuEntryList = [
      {
         entryText: 'Option 1',
         subEntryList: [
            {
               text: 'Option 1.1',
               action: ''
            },
            {
               text: 'Option 1.2',
               action: ''
            },
            {
               text: 'Option 1.3',
               action: ''
            },
         ]
      },
      {
         entryText: 'Option 2'
      },
      {
         entryText: 'Option 3',
         subEntryList: [
            {
               text: 'Option 3.1',
               action: ''
            },
            {
               text: 'Option 3.2',
               action: ''
            }
         ]
      }
   ];


   beforeEach(() => {
      cy.mount(<MenuBar menuEntryList={menuEntryList} />);
   });


   it('renders', () => {});


   it('displays user defined ', () => {
      cy.get('#Option\\ 1-main').should('have.text', 'Option 1');
      cy.get('#Option\\ 2-main').should('have.text', 'Option 2');
      cy.get('#Option\\ 3-main').should('have.text', 'Option 3');
   });


   it('displays user defined ', () => {
      cy.get('#Option\\ 1-main').click();
   });


});
