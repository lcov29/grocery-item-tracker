/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { isPriceInputValid } from './priceInputValidation';


type Props = {
   setPrice: (a: number) => void
};


function PriceInput(props: Props): ReactElement {
   const { setPrice } = props;
   const [input, setInput] = useState('');


   function updatePrice(): void {
      const parsedPriceInCent = Number.parseFloat(input.replace(',', '.')) * 100;
      setPrice(parsedPriceInCent);
   }


   function updateInput(inputText: string): void {
      let parsedInput = inputText.replaceAll(' ', '');
      parsedInput = parsedInput.replaceAll('€', '');
      setInput(parsedInput);
   }


   function handleBlur(): void {
      if (isPriceInputValid(input)) {
         updatePrice();
      } else {
         setInput('');
      }
   }


   return (
      <>
         <label htmlFor="input-price-per-unit">Price</label>
         <input
            id="input-price-per-unit"
            name="pricePerUnit"
            className="product-selection-input"
            type="text"
            value={(input) ? `${input} €` : ''}
            onChange={(e) => { updateInput(e.target.value); }}
            onBlur={handleBlur}
            required
         />
      </>
   );
}


export { PriceInput };
