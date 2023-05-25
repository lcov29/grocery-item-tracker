import React, { ReactElement, useState } from 'react';
import { Counter } from './Counter';


type CounterWrapperProps = {
   defaultValue: number,
   minimum?: number,
   maximum?: number,
   suffix?: string
};


function CounterWrapper(props: CounterWrapperProps): ReactElement {
   const { defaultValue, minimum, maximum, suffix } = props;
   const [value, setValue] = useState(defaultValue);

   return (
      <Counter
         value={value}
         setValue={setValue}
         minimum={minimum}
         maximum={maximum}
         suffix={suffix}
      />
   );
}


describe('<Counter />', () => {


   it('renders', () => {
      cy.mount(<CounterWrapper defaultValue={6} />);
   });


   it('displays user defined initial value', () => {
      cy.mount(<CounterWrapper defaultValue={5} />);
      cy.get('.counter-value').should('have.text', '5');
   });


   it('displays user defined initial value with user defined suffix', () => {
      cy.mount(<CounterWrapper defaultValue={5} suffix="items" />);
      cy.get('.counter-value').should('have.text', '5 items');
   });


   it('displays user defined minimum value when initial value is below that minimum', () => {
      cy.mount(<CounterWrapper defaultValue={5} minimum={10} />);
      cy.get('.counter-value').should('have.text', '10');

      cy.mount(<CounterWrapper defaultValue={-3} minimum={0} />);
      cy.get('.counter-value').should('have.text', '0');

      cy.mount(<CounterWrapper defaultValue={-7} minimum={-3} />);
      cy.get('.counter-value').should('have.text', '-3');
   });


   it('displays user defined maximum value when initial value is above that maximum', () => {
      cy.mount(<CounterWrapper defaultValue={9} maximum={5} />);
      cy.get('.counter-value').should('have.text', '5');

      cy.mount(<CounterWrapper defaultValue={9} maximum={0} />);
      cy.get('.counter-value').should('have.text', '0');

      cy.mount(<CounterWrapper defaultValue={9} maximum={-5} />);
      cy.get('.counter-value').should('have.text', '-5');

      cy.mount(<CounterWrapper defaultValue={-3} maximum={-7} />);
      cy.get('.counter-value').should('have.text', '-7');
   });


   it('increments by 1 when increment button is pressed', () => {
      cy.mount(<CounterWrapper defaultValue={4} />);
      cy.get('.counter-container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '5');
      cy.get('.counter-container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
      cy.get('.counter-container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '7');
   });


   it('decrements by 1 when decrement button is pressed', () => {
      cy.mount(<CounterWrapper defaultValue={4} />);
      cy.get('.counter-container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
      cy.get('.counter-container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '2');
      cy.get('.counter-container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '1');
   });


   it('increments not above the user defined maximum', () => {
      cy.mount(<CounterWrapper defaultValue={5} maximum={6} />);
      cy.get('.counter-container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
      cy.get('.counter-container > :nth-child(3)').click();
      cy.get('.counter-value').should('have.text', '6');
   });


   it('decrements not below the user defined minimum', () => {
      cy.mount(<CounterWrapper defaultValue={4} minimum={3} />);
      cy.get('.counter-container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
      cy.get('.counter-container > :nth-child(1)').click();
      cy.get('.counter-value').should('have.text', '3');
   });


});
