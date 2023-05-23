import React, { ReactElement, useEffect } from 'react';
import arrowLeft from '../../../icons/arrowLeftIcon.svg';
import arrowRight from '../../../icons/arrowRightIcon.svg';
import './counter.css';


function isValueBelowMinimum(value: number, minimum?: number): boolean {
   return (minimum !== undefined) ? value < minimum : false;
}


function isValueAboveMaximum(value: number, maximum?: number): boolean {
   return (maximum !== undefined) ? value > maximum : false;
}


type CounterProps = {
   value: number,
   setValue: (value: number) => void,
   minimum?: number,
   maximum?: number,
   suffix?: string
};


function formatValueString(counterValue: number, suffix: string): string {
   const result = suffix ? `${counterValue} ${suffix}` : counterValue.toString();
   return result;
}


function Counter(props: CounterProps): ReactElement {

   const { value, setValue, minimum, maximum, suffix = '' } = props;


   function updateCounter(inputValue: number): void {
      let output = inputValue;
      output = (isValueBelowMinimum(inputValue, minimum)) ? minimum as number : output;
      output = (isValueAboveMaximum(inputValue, maximum)) ? maximum as number : output;
      setValue(output);
   }


   useEffect(() => { updateCounter(value); }, []);


   function handleIncrement() {
      if (!isValueAboveMaximum(value, maximum)) {
         updateCounter(value + 1);
      }
   }


   function handleDecrement() {
      if (!isValueBelowMinimum(value, minimum)) {
         updateCounter(value - 1);
      }
   }


   return (
      <div id="counter-container">
         <button type="button" onClick={handleDecrement}>
            <img src={arrowLeft} alt="-" />
         </button>
         <div id="counter-value">{formatValueString(value, suffix)}</div>
         <button type="button" onClick={handleIncrement}>
            <img src={arrowRight} alt="+" />
         </button>
      </div>
   );

}


export { Counter };
