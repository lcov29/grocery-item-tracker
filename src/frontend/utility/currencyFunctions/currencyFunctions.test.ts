/* eslint-disable import/no-extraneous-dependencies */
import { describe, test, expect } from '@jest/globals';
import { parseDatabasePrice, parsePriceInput } from './currencyFunctions';


describe('currencyFunctions', () => {


   describe('parseDatabasePrice()', () => {

      test('formats price with fractional part correctly', () => {
         expect(parseDatabasePrice(1234)).toBe('12,34 €');
         expect(parseDatabasePrice(123456)).toBe('1.234,56 €');
         expect(parseDatabasePrice(123456789)).toBe('1.234.567,89 €');
      });

      test('pads price without fractional part correctly', () => {
         expect(parseDatabasePrice(100)).toBe('1,00 €');
         expect(parseDatabasePrice(100000)).toBe('1.000,00 €');
         expect(parseDatabasePrice(100000000)).toBe('1.000.000,00 €');
      });

   });


   describe('parsePriceInput()', () => {

      test('parses string input containing numbers correctly', () => {
         expect(parsePriceInput('0,24 €')).toBe(24);
         expect(parsePriceInput('1,24 €')).toBe(124);
         expect(parsePriceInput('2.564.345,24 €')).toBe(256434524);
      });

      test('returns NaN for strings without any number', () => {
         expect(parsePriceInput('')).toBe(NaN);
         expect(parsePriceInput(' ')).toBe(NaN);
         expect(parsePriceInput('foo bar %&/')).toBe(NaN);
      });

   });

});
