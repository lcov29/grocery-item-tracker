/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Counter } from './Counter';

describe('<Counter />', () => {

   let counterValue = 5;

   function setCounterValue(value: number) {
      counterValue = value;
   }


   beforeEach(() => {
      counterValue = 5;
   });


   it('renders', () => {
      cy.mount(
         <Counter value={counterValue} setValue={setCounterValue} />
      );
   });


   it('displays user defined initial value', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} />);
      cy.get('.counter-value').should('have.text', '5');
   });


   it('displays user defined initial value with user defined suffix', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} suffix="items" />);
      cy.get('.counter-value').should('have.text', '5 items');
   });


   it('displays user defined minimum value when initial value is below that minimum', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} minimum={10} />);
      cy.get('.counter-value').should('have.text', '10');
      /*
      cy.mount(<Counter value={-3} setValue={setCounterValue} minimum={0} />);
      cy.get('.counter-value').should('have.text', '0');
      cy.mount(<Counter value={-7} setValue={setCounterValue} minimum={-3} />);
      cy.get('.counter-value').should('have.text', '-3');
      */
   });


   it('displays user defined maximum value when initial value is above that maximum', () => {
      cy.mount(<Counter value={9} setValue={setCounterValue} maximum={5} />);
      cy.get('.counter-value').should('have.text', '5');
      cy.mount(<Counter value={9} setValue={setCounterValue} maximum={0} />);
      cy.get('.counter-value').should('have.text', '0');
      cy.mount(<Counter value={9} setValue={setCounterValue} maximum={-5} />);
      cy.get('.counter-value').should('have.text', '-5');
      cy.mount(<Counter value={9} setValue={setCounterValue} maximum={-5} />);
      cy.get('.counter-value').should('have.text', '-5');
      cy.mount(<Counter value={-3} setValue={setCounterValue} maximum={-7} />);
      cy.get('.counter-value').should('have.text', '-7');
   });


   it('increments by 1 when increment button is pressed', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '5');
      cy.get('#container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
      cy.get('#container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '7');
   });


   it('decrements by 1 when decrement button is pressed', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '2');
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '1');
   });


   it('increments not above the user defined maximum', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} maximum={6} />);
      cy.get('#container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
      cy.get('#container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
   });

   it('decrements not below the user defined minimum', () => {
      cy.mount(<Counter value={counterValue} setValue={setCounterValue} minimum={3} />);
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '4');
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
      cy.get('#container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
   });

});
