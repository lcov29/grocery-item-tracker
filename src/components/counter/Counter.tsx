import React, { useState, ReactElement } from 'react';
import './counter.css';


type CounterProps = {
   value: number,
   minimum?: number,
   maximum?: number,
   suffix?: string
};


function Counter({ value, minimum, maximum, suffix = '' } : CounterProps): ReactElement {

   const isMinimumDefined = minimum !== undefined;
   const isMaximumDefined = maximum !== undefined;
   const isInitialValueBelowMinimum = isMinimumDefined ? value < minimum : false;
   const isInitialValueAboveMaximum = isMaximumDefined ? value > maximum : false;

   let initialValue = value;
   initialValue = (isMinimumDefined && isInitialValueBelowMinimum) ? minimum : initialValue;
   initialValue = (isMaximumDefined && isInitialValueAboveMaximum) ? maximum : initialValue;

   const [counterValue, setCounterValue] = useState(initialValue);


   function handleIncrement() {
      const isMaximumReached = isMaximumDefined ? counterValue === maximum : false;
      const newValue = isMaximumReached ? counterValue : counterValue + 1;
      setCounterValue(newValue);
   }


   function handleDecrement() {
      const isMinimumReached = isMinimumDefined ? counterValue === minimum : false;
      const newValue = isMinimumReached ? counterValue : counterValue - 1;
      setCounterValue(newValue);
   }


   function formatValueString(): string {
      const result = suffix ? `${counterValue} ${suffix}` : counterValue.toString();
      return result;
   }


   return (
      <div id="container">
         <button type="button" className="button" onClick={handleDecrement}>
            <div className="icon icon-decrement" />
         </button>
         <div className="counter-value">{formatValueString()}</div>
         <button type="button" className="button" onClick={handleIncrement}>
            <div className="icon icon-increment" />
         </button>
      </div>
   );

}


export { Counter };
