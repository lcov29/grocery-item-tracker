import React from 'react';
import { MenuEntry } from './MenuEntry';

describe('<MenuEntry />', () => {


   beforeEach(() => {

      function addClassName(color: string): void {
         const menuEntry = document.getElementById('menu-entry');
         if (menuEntry) {
            menuEntry.classList.add(color);
         }
      }

      const menuEntry = (
         <MenuEntry
            id="menu-entry"
            idDropdownVisible="menu-entry"
            // eslint-disable-next-line react/jsx-no-bind
            setIdDropdownVisible={() => {}}
            button={{ content: 'Change Color', action: () => addClassName('red') }}
            dropdown={(
               <div>
                  <button type="button" onClick={() => addClassName('blue')}>Blue</button>
                  <button type="button" onClick={() => addClassName('green')}>Green</button>
               </div>
            )}
         />
      );

      cy.viewport(1200, 600);
      cy.mount(menuEntry);
   });


   it('renders', () => {});


   it('renders with user defined id', () => {
      cy.get('#menu-entry').should('exist');
   });


   it('renders user defined button text', () => {
      cy.get('#menu-entry').should('contain.text', 'Change Color');
   });


   it('renders user defined dropdown', () => {
      cy.get('#menu-entry').trigger('mouseover');
      const dropdown = cy.get('.menu-entry-dropdown');
      dropdown.should('contain.text', 'Blue');
      dropdown.should('contain.text', 'Green');
   });


   it('renders collapsed dropdown icon for menu entries with dropdown', () => {
      cy.mount(<MenuEntry id="menu-entry" button={{ content: 'Color' }} idDropdownVisible="" setIdDropdownVisible={() => {}} dropdown={<p>Option</p>} />);
      cy.get('img').should('exist');
   });


   it('does not render dropdown icon for menu entries without dropdown', () => {
      cy.mount(<MenuEntry id="menu-entry" button={{ content: 'Change Color' }} idDropdownVisible="" setIdDropdownVisible={() => {}} />);
      cy.get('img').should('not.exist');
   });


   it('executes user defined function upon button click', () => {
      cy.get('#menu-entry').click();
      cy.get('#menu-entry').click();
      cy.get('#menu-entry').should('have.class', 'red');
   });


});
