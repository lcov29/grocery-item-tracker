import React from 'react';
import { SearchableDropdown } from './SearchableDropdown';


describe('<SearchableDropdown />', () => {

   const foodOptionList = ['Ananas', 'Apple', 'Pizza', 'Bread', 'Cornflakes', 'Banana'];


   beforeEach(() => {
      cy.mount(<SearchableDropdown id="foodItemDropdown" placeholderText="Food Item" optionList={foodOptionList} />);
   });


   it('renders', () => {});


   it('displays user defined placeholder text', () => {
      cy.get('#foodItemDropdown').invoke('attr', 'placeholder').should('eq', 'Food Item');
   });


   it('does not display placeholder text if not specified', () => {
      cy.mount(<SearchableDropdown id="foodItemDropdown" optionList={['A']} />);
      cy.get('#foodItemDropdown').invoke('attr', 'placeholder').should('eq', '');
   });


   it('displays user defined option list', () => {
      cy.get('#foodItemDropdown-list option')
         .should('have.length', foodOptionList.length)
         .first()
         .should('have.value', foodOptionList[0])
         .next()
         .should('have.value', foodOptionList[1])
         .next()
         .should('have.value', foodOptionList[2])
         .next()
         .should('have.value', foodOptionList[3])
         .next()
         .should('have.value', foodOptionList[4])
         .next()
         .should('have.value', foodOptionList[5]);
   });


   it('accepts user input matching at least one available option', () => {
      cy.get('#foodItemDropdown')
         .type('Cornflakes')
         .blur()
         .should('have.value', 'Cornflakes');
   });


   it('rejects user input that is not matching any available option', () => {
      cy.get('#foodItemDropdown')
         .type('CornflaKes')
         .blur()
         .should('have.value', '');
   });

});
