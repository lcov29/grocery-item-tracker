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
            key={1}
            button={{ text: 'Change Color', action: () => addClassName('red') }}
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
      cy.get('#menu-entry').should('contain.text', 'Color');
   });


   it('renders user defined dropdown', () => {
      cy.get('#menu-entry').trigger('mouseover');
      const dropdown = cy.get('.menu-entry-dropdown');
      dropdown.should('contain.text', 'Blue');
      dropdown.should('contain.text', 'Green');
   });


   it('renders dropdown icon for menu entries with dropdown', () => {
      cy.get('#menu-entry').should('have.class', 'collapsed-dropdown');
   });


   it('does not render dropdown icon for menu entries without dropdown', () => {
      cy.mount(<MenuEntry id="menu-entry" button={{ text: 'Color' }} />);
      cy.get('#menu-entry').should('not.have.class', 'menu-entry-with-dropdown');
   });


   it('displays user defined dropdown when mouse is over menu button in desktop view', () => {
      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#menu-entry').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
   });


   it('displays user defined dropdown when menu button is clicked in mobile view', () => {
      cy.viewport(650, 600);
      cy.get('.menu-entry-dropdown').should('not.exist');

      cy.get('#menu-entry').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('not.exist');

      cy.get('#menu-entry').click();
      cy.get('.menu-entry-dropdown').should('exist');
   });


   it('hides dropdown when mouse is leaving displayed dropdown area in desktop view', () => {
      cy.get('#menu-entry').trigger('mouseover');

      const dropdown = cy.get('.menu-entry-dropdown');
      dropdown.should('exist');
      dropdown.trigger('mouseout');
      dropdown.should('not.exist');
   });


   it('hides dropdown when mouse is leaving displayed dropdown area in mobile view', () => {
      cy.viewport(650, 600);
      cy.get('#menu-entry').click();

      const dropdown = cy.get('.menu-entry-dropdown');
      dropdown.should('exist');
      dropdown.trigger('mouseout');
      dropdown.should('not.exist');
   });


});
