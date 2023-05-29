/* eslint-disable import/no-extraneous-dependencies */
import { describe, test, expect } from '@jest/globals';
import { formatDatabasePrice } from './currencyFunctions';


describe('currencyFunctions', () => {


   describe('formatDatabasePrice()', () => {

      test('formats price with fractional part correctly', () => {
         expect(formatDatabasePrice(1234)).toBe('12,34 €');
         expect(formatDatabasePrice(123456)).toBe('1.234,56 €');
         expect(formatDatabasePrice(123456789)).toBe('1.234.567,89 €');
      });

      test('pads price without fractional part correctly', () => {
         expect(formatDatabasePrice(100)).toBe('1,00 €');
         expect(formatDatabasePrice(100000)).toBe('1.000,00 €');
         expect(formatDatabasePrice(100000000)).toBe('1.000.000,00 €');
      });

   });

});
