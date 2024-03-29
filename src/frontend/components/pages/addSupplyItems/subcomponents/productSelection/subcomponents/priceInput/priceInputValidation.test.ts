/* eslint-disable import/no-extraneous-dependencies */
import { describe, test, expect } from '@jest/globals';
import {
   isInputNotEmpty,
   isContainingOnlyValidCharacters,
   isContainingAtMostOneDecimalSeparator,
   isAmountOfCharactersAfterDecimalSeparatorCorrect,
   isPriceInputValid
} from './priceInputValidation';



describe('priceInputValidation', () => {


   describe('isInputEmpty()', () => {

      test('detects valid input', () => {
         expect(isInputNotEmpty('123')).toBe(true);
         expect(isInputNotEmpty(' ')).toBe(true);
         expect(isInputNotEmpty('foo bar')).toBe(true);
      });

      test('detects invalid input', () => {
         expect(isInputNotEmpty('')).toBe(false);
      });

   });


   describe('isContainingOnlyValidCharacters()', () => {

      test('detects valid input', () => {
         expect(isContainingOnlyValidCharacters('123')).toBe(true);
         expect(isContainingOnlyValidCharacters('0')).toBe(true);
         expect(isContainingOnlyValidCharacters('1,')).toBe(true);
         expect(isContainingOnlyValidCharacters('1,234')).toBe(true);
         expect(isContainingOnlyValidCharacters('1.')).toBe(true);
         expect(isContainingOnlyValidCharacters('1.234')).toBe(true);
         expect(isContainingOnlyValidCharacters('1.2.3,4,5')).toBe(true);
      });

      test('detects invalid input', () => {
         expect(isContainingOnlyValidCharacters('123€')).toBe(false);
         expect(isContainingOnlyValidCharacters(' ')).toBe(false);
         expect(isContainingOnlyValidCharacters('AbcD')).toBe(false);
         expect(isContainingOnlyValidCharacters('123:45')).toBe(false);
         expect(isContainingOnlyValidCharacters('123%45')).toBe(false);
      });

   });


   describe('isContainingAtMostOneDecimalSeparator', () => {

      test('detects valid input', () => {
         expect(isContainingAtMostOneDecimalSeparator('123456')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('ABCDEF')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123,456')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123.456')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('abc,def')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('abc.def')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('.123')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator(',123')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('.abc')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator(',abc')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123.')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123,')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123.4')).toBe(true);
         expect(isContainingAtMostOneDecimalSeparator('123,4')).toBe(true);
      });

      test('detects invalid input', () => {
         expect(isContainingAtMostOneDecimalSeparator('123.456.789')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('123,456,789')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('abc.def.ghi')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('abc,def,ghi')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('..123')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator(',,123')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('..abc')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator(',,abc')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('123..')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('123,,')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('abc..')).toBe(false);
         expect(isContainingAtMostOneDecimalSeparator('abc,,')).toBe(false);
      });

   });


   describe('isAmountOfCharactersAfterDecimalSeparatorCorrect()', () => {

      test('detects valid input', () => {
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',c')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',3')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',(')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',cd')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',34')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',(%')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab,c')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12,3')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('%&,(')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab.c')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12.3')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('%&.(')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab,cd')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12,34')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('%&,(?')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab.cd')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12.34')).toBe(true);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('%&.(?')).toBe(true);
      });

      test('detects invalid input', () => {
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab,')).toBe(false);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12,')).toBe(false);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',')).toBe(false);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('ab,cde')).toBe(false);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect('12,345')).toBe(false);
         expect(isAmountOfCharactersAfterDecimalSeparatorCorrect(',   ')).toBe(false);
      });

   });


   describe('isPriceInputValid()', () => {

      test('detects valid input', () => {
         expect(isPriceInputValid('12,34')).toBe(true);
         expect(isPriceInputValid('12.34')).toBe(true);
         expect(isPriceInputValid(' 12,34')).toBe(true);
         expect(isPriceInputValid(' 12.34')).toBe(true);
         expect(isPriceInputValid('12, 34')).toBe(true);
         expect(isPriceInputValid('12. 34')).toBe(true);
         expect(isPriceInputValid('1234567890,12')).toBe(true);
         expect(isPriceInputValid('1234567890.12')).toBe(true);
         expect(isPriceInputValid('0123456789')).toBe(true);
         expect(isPriceInputValid('012,34')).toBe(true);
         expect(isPriceInputValid('012.34')).toBe(true);
      });

      test('detects invalid input', () => {
         expect(isPriceInputValid('-12')).toBe(false);
         expect(isPriceInputValid('+12')).toBe(false);
         expect(isPriceInputValid('12,34 €')).toBe(false);
         expect(isPriceInputValid('12.34 €')).toBe(false);
         expect(isPriceInputValid('12,34A')).toBe(false);
         expect(isPriceInputValid('12.34A')).toBe(false);
         expect(isPriceInputValid('12,345')).toBe(false);
         expect(isPriceInputValid('12.345')).toBe(false);
         expect(isPriceInputValid('1234567890,123')).toBe(false);
         expect(isPriceInputValid('1234567890.123')).toBe(false);
         expect(isPriceInputValid('Test')).toBe(false);
         expect(isPriceInputValid('!"§$%&/()=?`´*+~#-_.:,;<>|^°')).toBe(false);
         expect(isPriceInputValid('')).toBe(false);
         expect(isPriceInputValid(' ')).toBe(false);
      });

   });

});
