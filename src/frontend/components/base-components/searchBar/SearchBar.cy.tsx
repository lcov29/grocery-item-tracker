import React from 'react';
import { SearchBar } from './SearchBar';


describe('<SearchBar />', () => {


   beforeEach(() => {
      cy.mount(<SearchBar id="fruit" optionList={['Ananas', 'Apple', 'Banana']} />);
   });


   it('renders', () => {});


});
