/* eslint-disable import/no-extraneous-dependencies */
import { describe, test, expect } from '@jest/globals';
import { parseDatabasePrice } from './currencyFunctions';


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

});
