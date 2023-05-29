function isInputNotEmpty(input: string): boolean {
   return input !== '';
}


function isContainingOnlyValidCharacters(input: string): boolean {
   return input.search(/[^0-9.,]+/g) === -1;
}


function isContainingNoLeadingZero(input: string): boolean {
   return !input.startsWith('0');
}


function isContainingAtMostOneDecimalSeparator(input: string): boolean {
   const separatorList = input.match(/[.,]/g);
   if (separatorList) {
      return separatorList.length === 1;
   }
   return true;
}


function isAmountOfCharactersAfterDecimalSeparatorCorrect(input: string): boolean {
   const hasDecimalSeparator = input.match(/[.,]/g) !== null;

   if (hasDecimalSeparator) {
      const decimalSeparatorIndex = input.search(/[.,]/g);
      const stringAfterSeparator = input.substring(decimalSeparatorIndex + 1);
      return [1, 2].includes(stringAfterSeparator.length);
   }
   return true;
}


function isPriceInputValid(input: string): boolean {
   const price = input.replaceAll(' ', '');
   return (
      isInputNotEmpty(price)
      && isContainingOnlyValidCharacters(price)
      && isContainingNoLeadingZero(price)
      && isContainingAtMostOneDecimalSeparator(price)
      && isAmountOfCharactersAfterDecimalSeparatorCorrect(price)
   );
}


export {
   isInputNotEmpty,
   isContainingOnlyValidCharacters,
   isContainingNoLeadingZero,
   isContainingAtMostOneDecimalSeparator,
   isAmountOfCharactersAfterDecimalSeparatorCorrect,
   isPriceInputValid
};
