import React, { ReactElement, useState, useEffect } from 'react';
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
   minimum?: number,
   maximum?: number,
   suffix?: string
};


function formatValueString(counterValue: number, suffix: string): string {
   const result = suffix ? `${counterValue} ${suffix}` : counterValue.toString();
   return result;
}


function Counter(props: CounterProps): ReactElement {

   const { value, minimum, maximum, suffix = '' } = props;
   const [counterValue, setCounterValue] = useState(value);


   function updateCounter(inputValue: number): void {
      let output = inputValue;
      output = (isValueBelowMinimum(inputValue, minimum)) ? minimum as number : output;
      output = (isValueAboveMaximum(inputValue, maximum)) ? maximum as number : output;
      setCounterValue(output);
   }


   useEffect(() => { updateCounter(value); }, []);


   function handleIncrement() {
      if (!isValueAboveMaximum(counterValue, maximum)) {
         updateCounter(counterValue + 1);
      }
   }


   function handleDecrement() {
      if (!isValueBelowMinimum(counterValue, minimum)) {
         updateCounter(counterValue - 1);
      }
   }


   return (
      <div id="container">
         <button type="button" className="button" onClick={handleDecrement}>
            <img src={arrowLeft} alt="-" />
         </button>
         <div className="counter-value">{formatValueString(counterValue, suffix)}</div>
         <button type="button" className="button" onClick={handleIncrement}>
            <img src={arrowRight} alt="+" />
         </button>
      </div>
   );

}


export { Counter };
