/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { parseDatabasePrice, parsePriceInput } from '../../../../../../../utility/currencyFunctions/currencyFunctions';
import { isPriceInputValid } from './priceInputValidation';
import './priceInput.css';


type Props = {
   setPrice: (a: number) => void
};


function PriceInput(props: Props): ReactElement {
   const { setPrice } = props;
   const [input, setInput] = useState('');


   function updatePrice(): void {
      if (isPriceInputValid(input)) {
         const parsedInputNumber = parsePriceInput(input);
         const parsedInputFormattedString = parseDatabasePrice(parsedInputNumber);
         setInput(parsedInputFormattedString);
         setPrice(parsedInputNumber);
      } else {
         setInput('');
         setPrice(0);
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
            value={input}
            onChange={(e) => { setInput(e.target.value); }}
            onBlur={updatePrice}
            required
         />
      </>
   );
}


export { PriceInput };
