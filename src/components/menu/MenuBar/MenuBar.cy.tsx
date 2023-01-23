import React from 'react';
import { MenuBar } from './MenuBar';
import { MenuEntry } from '../MenuEntry/MenuEntry';


describe('<MenuBar />', () => {


   beforeEach(() => {
      const menuEntryList = [
         <p>Option 1</p>,
         <p>Option 2</p>,
         <p>Option 3</p>,
         <p>Option 4</p>
      ];
      cy.mount(<MenuBar menuEntryList={menuEntryList} />);
      cy.viewport(1000, 600);
   });


   it('renders', () => {});


   it('renders user defined entries', () => {
      const entrySection = cy.get('.menu-container');
      entrySection.should('contain.text', 'Option 1');
      entrySection.should('contain.text', 'Option 2');
      entrySection.should('contain.text', 'Option 3');
      entrySection.should('contain.text', 'Option 4');
   });


   it('hides toggle button in desktop view', () => {
      cy.get('.toggle-button').should('not.exist');
   });


   it('displays visibility toggle button in mobile view by default', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').should('exist');
      cy.get('.collapsed-icon').should('exist');
      cy.get('.unfolded-icon').should('not.exist');
   });


   it('displays user defined entries in desktop view', () => {
      cy.get('.menu-container').should('be.visible');
   });


   it('hides user defined entries in mobile view by default', () => {
      cy.viewport(600, 600);
      cy.get('.menu-container').should('not.exist');
   });


   it('displays user defined entries after clicking the toggle button', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('exist');
   });


   it('displays unfolded icon after clicking the toggle button', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.collapsed-icon').should('not.exist');
      cy.get('.unfolded-icon').should('exist');
   });


   it('displays user defined entries after clicking the toggle button', () => {
      cy.viewport(600, 600);
      cy.get('.toggle-button').click();
      cy.get('.menu-container').should('exist');
   });


   it('displays collapsed icon after clicking the toggle button two times', () => {
      cy.viewport(600, 600);
      const toggleButton = cy.get('.toggle-button');
      toggleButton.click();
      toggleButton.click();
      cy.get('.collapsed-icon').should('exist');
      cy.get('.unfolded-icon').should('not.exist');
   });


   it('closes all dropdowns of MenuEntry elements upon mouse leaving', () => {
      const menuBar = (
         <MenuBar menuEntryList={[
            <MenuEntry
               id="menu-entry"
               key={1}
               button={{ text: 'Change Color' }}
               dropdown={(
                  <div>
                     <button type="button" onClick={() => {}}>Blue</button>
                     <button type="button" onClick={() => {}}>Green</button>
                  </div>
               )}
            />
         ]}
         />
      );

      cy.viewport(1200, 600);
      cy.mount(menuBar);

      cy.get('.menu-entry-dropdown').should('not.exist');
      cy.get('#menu-entry').trigger('mouseover');
      cy.get('.menu-entry-dropdown').should('be.visible');
      cy.get('nav').trigger('mouseout');
      cy.get('.menu-entry-dropdown').should('not.be.visible');
   });


});
