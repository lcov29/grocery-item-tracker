import React, { ReactElement, useState } from 'react';
import { ModalInputPrompt } from './ModalInputPrompt';


function ModalInputPromptWrapper(): ReactElement {
   const [displayPrompt, setDisplayPrompt] = useState(true);
   const [inputValue, setInputValue] = useState('');

   if (displayPrompt) {
      return (
         <ModalInputPrompt
            title="Titel"
            inputValue={inputValue}
            setInputValue={setInputValue}
            displayPrompt={setDisplayPrompt}
            handleSave={() => { setInputValue('handleSave'); }}
         />
      );
   }
   return <p>Prompt not rendered</p>;
}


describe('<ModalInputPrompt />', () => {

   beforeEach(() => {
      cy.mount(<ModalInputPromptWrapper />);
   });


   it('renders', () => {
      cy.mount(<ModalInputPromptWrapper />);
   });


   it('displays user defined title', () => {
      cy.get('h3').should('contain.text', 'Titel');
   });


   it('disappears after clicking on cancel button', () => {
      cy.get('.modal-input-prompt-control-bar > :nth-child(1)').click();
      cy.get('p').should('contain.text', 'Prompt not rendered');
   });


   it('takes user input', () => {
      cy.get('.modal-input-prompt-input').type('input');
      cy.get('.modal-input-prompt-input').should('contain.value', 'input');
   });


   it('executes user defined function upon saving', () => {
      cy.get('.modal-input-prompt-control-bar > :nth-child(2)').click();
      cy.get('.modal-input-prompt-input').should('contain.value', 'handleSave');
   });

});
