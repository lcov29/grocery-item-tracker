import React from 'react';
import { Category } from './Category';


describe('<Category />', () => {


   it('renders', () => {
      cy.mount(<Category name="CategoryName" />);
   });


   it('displays user defined category name', () => {
      cy.mount(<Category name="CategoryName" />);
      cy.get('.categoryName').should('have.text', 'CategoryName');
   });


   it('displays user defined additional text', () => {
      cy.mount(<Category name="CategoryName" additionalText="AdditionalText" />);
      cy.get('.additionalText').should('have.text', 'AdditionalText');
   });


   it('adds formatting style classes for top level elements', () => {
      // Top Level Category
      cy.mount(<Category name="CategoryName" isTopLevel />);
      cy.get('.categoryBar').should('have.class', 'categoryBarTopLevel');
      cy.get('.categoryContainerTopLevel').should('exist');
      cy.get('.categoryContainerSubLevel').should('not.exist');

      // Sub Level Category
      cy.mount(<Category name="CategoryName" />);
      cy.get('.categoryBar').should('have.class', 'categoryBarSubLevel');
      cy.get('.categoryContainerTopLevel').should('not.exist');
      cy.get('.categoryContainerSubLevel').should('exist');
   });


   it('displays user defined content', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('.category').should('exist');
      cy.get('p').should('have.text', 'Content');
   });


   it('renders a collapse button for user defined content', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('#CategoryName-content-collapse-button').should('exist');
      cy.get('#CategoryName-content-collapse-button').should('have.text', '^');
   });


   it('collapses user defined content upon click of collapse button', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('#CategoryName-content-collapse-button').click();
      cy.get('.category-content-section').should('not.exist');
   });


   it('collapses user defined content upon click of collapse button', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('#CategoryName-content-collapse-button').click();
      cy.get('#CategoryName-content-collapse-button').should('have.text', 'V');
      cy.get('.category-content-section').should('not.exist');
   });

});
