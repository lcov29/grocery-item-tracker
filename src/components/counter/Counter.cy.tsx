import React from 'react';
import { Counter } from './Counter';

describe('<Counter />', () => {


   it('renders', () => {
      cy.mount(<Counter value={5} />);
   });


   it('displays user defined initial value', () => {
      cy.mount(<Counter value={9} />);
      cy.get('#counterValue').should('have.text', '9');
   });


   it('displays user defined initial value with user defined suffix', () => {
      cy.mount(<Counter value={3} suffix="items" />);
      cy.get('#counterValue').should('have.text', '3 items');
   });


   it('displays user defined minimum value when initial value is below that minimum', () => {
      cy.mount(<Counter value={4} minimum={10} />);
      cy.get('#counterValue').should('have.text', '10');
      cy.mount(<Counter value={-3} minimum={0} />);
      cy.get('#counterValue').should('have.text', '0');
      cy.mount(<Counter value={-7} minimum={-3} />);
      cy.get('#counterValue').should('have.text', '-3');
   });


   it('displays user defined maximum value when initial value is above that maximum', () => {
      cy.mount(<Counter value={9} maximum={5} />);
      cy.get('#counterValue').should('have.text', '5');
      cy.mount(<Counter value={9} maximum={0} />);
      cy.get('#counterValue').should('have.text', '0');
      cy.mount(<Counter value={9} maximum={-5} />);
      cy.get('#counterValue').should('have.text', '-5');
      cy.mount(<Counter value={9} maximum={-5} />);
      cy.get('#counterValue').should('have.text', '-5');
      cy.mount(<Counter value={-3} maximum={-7} />);
      cy.get('#counterValue').should('have.text', '-7');
   });


   it('increments by 1 when increment button is pressed', () => {
      cy.mount(<Counter value={4} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '5');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '6');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '7');
   });


   it('decrements by 1 when decrement button is pressed', () => {
      cy.mount(<Counter value={4} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '3');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '2');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '1');
   });


   it('increments not above the user defined maximum', () => {
      cy.mount(<Counter value={1} maximum={2} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '2');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '2');

      cy.mount(<Counter value={-2} maximum={0} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '-1');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '0');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '0');

      cy.mount(<Counter value={-3} maximum={-1} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '-2');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '-1');
      cy.get('#container > :nth-child(3)').click();
      cy.get('#counterValue').should('have.text', '-1');
   });

   it('decrements not below the user defined minimum', () => {
      cy.mount(<Counter value={3} minimum={1} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '2');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '1');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '1');

      cy.mount(<Counter value={2} minimum={0} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '1');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '0');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '0');

      cy.mount(<Counter value={-1} minimum={-3} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '-2');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '-3');
      cy.get('#container > :nth-child(1)').click();
      cy.get('#counterValue').should('have.text', '-3');
   });

});
