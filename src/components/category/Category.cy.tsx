import React from 'react';
import { Category } from './Category';


describe('<Category />', () => {


   it('renders', () => {
      cy.mount(<Category name="CategoryName" />);
   });


   it('displays user defined category name', () => {
      cy.mount(<Category name="CategoryName" />);
      cy.get('.category-name').should('have.text', 'CategoryName');
   });


   it('displays user defined additional text', () => {
      cy.mount(<Category name="CategoryName" additionalText="AdditionalText" />);
      cy.get('.additionalText').should('have.text', 'AdditionalText');
   });


   it('adds formatting style classes for top level elements', () => {
      // Top Level Category
      cy.mount(<Category name="CategoryName" isTopLevel />);
      cy.get('.category-bar').should('have.class', 'category-bar-top-level');
      cy.get('.category-bar-top-level').should('exist');
      cy.get('.category-bar-sub-level').should('not.exist');

      // Sub Level Category
      cy.mount(<Category name="CategoryName" />);
      cy.get('.category-bar').should('have.class', 'category-bar-sub-level');
      cy.get('.category-bar-top-level').should('not.exist');
      cy.get('.category-bar-sub-level').should('exist');
   });


   it('renders a collapse button for user defined content', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('.toggle-button').should('exist');
   });


   it('does not render a collapse button when no user defined content is available', () => {
      cy.mount(<Category name="CategoryName" isTopLevel />);
      cy.get('.category-name').should('exist');
   });


   it('hides user defined content by default', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('.content-section').should('not.exist');
   });


   it('shows user defined content upon first click of collapse button', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('.content-section').should('not.exist');
      cy.get('.toggle-button').click();
      cy.get('.content-section').should('exist');
   });


   it('collapses user defined content upon second click of collapse button', () => {
      cy.mount(<Category name="CategoryName" isTopLevel contentList={[<p>Content</p>]} />);
      cy.get('.content-section').should('not.exist');
      cy.get('.toggle-button').click();
      cy.get('.content-section').should('exist');
      cy.get('.toggle-button').click();
      cy.get('.content-section').should('not.exist');
   });


   it('renders sub category elements', () => {
      const subLevelCategory = <Category name="SubCategoryName" contentList={[<p>Content</p>]} />;
      const topLevelCategory = <Category name="TopCategoryName" contentList={[subLevelCategory]} isTopLevel />;
      cy.mount(topLevelCategory);
   });


   it('hides subcategory by default', () => {
      const subLevelCategory = <Category name="SubCategoryName" contentList={[<p>Content</p>]} />;
      const topLevelCategory = <Category name="TopCategoryName" contentList={[subLevelCategory]} isTopLevel />;
      cy.mount(topLevelCategory);
      cy.get('.category-container-sub-level > .category > .category-bar').should('not.exist');
   });


   it('shows collapsed subcategory upon first click on topcategory toggle button', () => {
      const subLevelCategory = <Category name="SubCategoryName" contentList={[<p>Content</p>]} />;
      const topLevelCategory = <Category name="TopCategoryName" contentList={[subLevelCategory]} isTopLevel />;
      cy.mount(topLevelCategory);
      cy.get('.toggle-button').click();
      cy.get('.category-container-sub-level > .category > .category-bar > .category-name').should('be.visible');
      cy.get('p').should('not.exist');
   });


   it('shows subcategory content upon first click on subcategory toggle button', () => {
      const subLevelCategory = <Category name="SubCategoryName" contentList={[<p>Content</p>]} />;
      const topLevelCategory = <Category name="TopCategoryName" contentList={[subLevelCategory]} isTopLevel />;
      cy.mount(topLevelCategory);
      cy.get('.toggle-button').click();
      cy.get('.category-container-sub-level > .category > .category-bar > .toggle-button').click();
      cy.get('p').should('exist');
      cy.get('p').should('be.visible');
   });

});
