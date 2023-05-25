/* eslint-disable import/no-extraneous-dependencies */
import { describe, test, expect } from '@jest/globals';
import { parseDatabaseDate } from './parseDate';


describe('parseDatabaseDate', () => {

   test('1987-01-01 --> 01.01.1987', () => {
      expect(parseDatabaseDate('1987-01-01')).toBe('01.01.1987');
   });


   test('2022-04-14 --> 14.04.2022', () => {
      expect(parseDatabaseDate('2022-04-14')).toBe('14.04.2022');
   });


   test('2023-12-31 --> 31.12.2023', () => {
      expect(parseDatabaseDate('2023-12-31')).toBe('31.12.2023');
   });

});
