import React from 'react';
import { TabArea } from './TabArea';


describe('<TabArea />', () => {


   beforeEach(() => {
      const entryList = [
         { headline: 'Option 1', content: <p>Option 1</p> },
         { headline: 'Option 2', content: <p>Option 2</p> },
         { headline: 'Option 3', content: <p>Option 3</p> }
      ];
      cy.mount(<TabArea entryList={entryList} />);
   });


   it('renders', () => {});


   it('displays user defined tabs', () => {
      const tabBar = cy.get('.tab-bar');
      tabBar.should('contain.text', 'Option 1');
      tabBar.should('contain.text', 'Option 2');
      tabBar.should('contain.text', 'Option 3');
   });


   it('displays content of first entry by default', () => {
      cy.get('.tab-content-area').should('contain.text', 'Option 1');
      cy.get('.tab-bar > :nth-child(1)').should('have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(2)').should('not.have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(3)').should('not.have.class', 'active-tab');
   });


   it('changes content upon clicking a tab button', () => {
      cy.get('.tab-bar > :nth-child(2)').click();
      cy.get('.tab-content-area').should('contain.text', 'Option 2');
      cy.get('.tab-bar > :nth-child(1)').should('not.have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(2)').should('have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(3)').should('not.have.class', 'active-tab');

      cy.get('.tab-bar > :nth-child(3)').click();
      cy.get('.tab-content-area').should('contain.text', 'Option 3');
      cy.get('.tab-bar > :nth-child(1)').should('not.have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(2)').should('not.have.class', 'active-tab');
      cy.get('.tab-bar > :nth-child(3)').should('have.class', 'active-tab');
   });


});
