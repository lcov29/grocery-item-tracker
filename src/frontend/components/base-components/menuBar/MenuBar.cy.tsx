import React from 'react';
import { MenuBar } from './MenuBar';


describe('<MenuBar />', () => {


   beforeEach(() => {
      const menuEntryList = [
         {
            button: { content: 'Option 1' },
            dropdown: (
               <>
                  <div>Entry1</div>
                  <div>Entry2</div>
               </>
            )
         },
         { button: { content: 'Option 2' } },
         {
            button: { content: 'Option 3' },
            dropdown: (
               <>
                  <div>Entry1</div>
                  <div>Entry2</div>
                  <div>Entry3</div>
               </>
            )
         }
      ];
      cy.mount(<MenuBar menuEntryList={menuEntryList} />);
      cy.viewport(1000, 600);
   });


   it('renders', () => {});


   it('renders user defined entries by default in desktop view', () => {
      const entrySection = cy.get('.menu-container');
      entrySection.should('contain.text', 'Option 1');
      entrySection.should('contain.text', 'Option 2');
      entrySection.should('contain.text', 'Option 2');
   });


   it('hides toggle button in desktop view', () => {
      cy.get('.toggle-button').should('not.exist');
   });


   it('displays user defined entries in desktop view', () => {
      cy.get('.menu-container').should('be.visible');
   });


   it('displays existing dropdown after mouse entering menu entry in desktop mode', () => {
      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#entry-0').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
   });


   it('close displayed dropdown when mouse leaves dropdown in desktop mode', () => {
      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#entry-0').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').trigger('mouseout');
      cy.get('.menu-entry-dropdown').should('not.exist');
   });


   it('displaying dropdown while other dropdown is already displayed closes other dropdown in desktop mode', () => {
      cy.get('#entry-0').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry1');
      cy.get('#entry-2').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry3');
   });


   it('close displayed dropdown when cursor leaves menu bar in desktop view', () => {
      cy.get('#entry-0').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('nav').trigger('mouseout');
      cy.get('.menu-entry-dropdown').should('not.exist');
   });


   it('hides user defined entries by default in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.menu-container').should('not.exist');
   });


   it('displays toggle button with collapse icon by default in mobile view', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').should('exist');
      cy.get('.collapsed-icon').should('exist');
      cy.get('.unfolded-icon').should('not.exist');
   });


   it('displays user defined entries after clicking the toggle button in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('exist');
      cy.get('.menu-container').should('contain.text', 'Option 1');
      cy.get('.menu-container').should('contain.text', 'Option 2');
      cy.get('.menu-container').should('contain.text', 'Option 3');
   });


   it('displays unfolded icon after clicking the toggle button in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.collapsed-icon').should('not.exist');
      cy.get('.unfolded-icon').should('exist');
   });


   it('hides displayed user entries after clicking the toggle button in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('exist');
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('not.exist');
   });


   it('displays collapsed icon after hiding user entries after clicking the toggle button in mobile mode', () => {
      cy.viewport(600, 600);
      const toggleButton = cy.get('.toggle-button');
      toggleButton.click();
      toggleButton.click();
      cy.get('.collapsed-icon').should('exist');
      cy.get('.unfolded-icon').should('not.exist');
   });


   it('displays existing dropdown after clicking menu entry in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('exist');
      cy.get('#entry-0').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#entry-0').click();
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry1');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry2');
   });


   it('close displayed dropdown when mouse leaves dropdown in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('#entry-0').click();
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').trigger('mouseout');
      cy.get('.menu-entry-dropdown').should('not.exist');
   });


   it('displaying dropdown while other dropdown is already displayed closes other dropdown in mobile mode', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('#entry-0').click();
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry1');
      cy.get('#entry-1').click();
      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#entry-0').click();
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry1');
      cy.get('#entry-2').click();
      cy.get('.menu-entry-dropdown').should('exist');
      cy.get('.menu-entry-dropdown').should('contain.text', 'Entry3');
   });


});
