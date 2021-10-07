import timezoneMock from 'timezone-mock';

import * as dateUtil from './date';

const inputValidDate = new Date(Date.UTC(2020, 0, 31, 16, 55, 0));
const inputValidStringDate = '2020-01-31 16:55:00-0000';
const inputInvalidStringDate = '2020-00-31 16:55:00';
const resultFormattedDate = '16:55:00';
const resultISOFormatted = '2020-01-31T16:55:00.000Z';

describe('date util tests', () => {
  beforeAll(() => {
    timezoneMock.register('UTC');
  });

  afterAll(() => {
    timezoneMock.unregister();
  });

  it('should be able to format date to HH:mm:ss format when a date is informed', () => {
    const formattedDate = dateUtil.formatDate(inputValidDate, 'HH:mm:ss');
    expect(formattedDate).toEqual(resultFormattedDate);
  });

  it('should be able to format date to HH:mm:ss format when a valida date string is informed', () => {
    const formattedDate = dateUtil.formatDate(inputValidStringDate, 'HH:mm:ss');
    expect(formattedDate).toEqual(resultFormattedDate);
  });

  it('should not be able to format date to HH:mm:ss format when an invalid date string is informed', () => {
    const formattedDate = dateUtil.formatDate(inputInvalidStringDate);
    expect(formattedDate).toEqual('-');
  });

  it('should be able to format to ISO when a valid date is informed', () => {
    const toISOFormatted = dateUtil.formatToISO(inputValidDate);
    expect(toISOFormatted).toEqual(resultISOFormatted);
  });

  it('should be able to format to ISO when a valid string date is informed', () => {
    const toISOFormatted = dateUtil.formatToISO(inputValidStringDate);
    expect(toISOFormatted).toEqual(resultISOFormatted);
  });

  it('should be able to return ISO null when date is not informed', () => {
    expect(dateUtil.formatToISO('')).toBe(null);
    expect(dateUtil.formatToISO(null)).toBe(null);
    expect(dateUtil.formatToISO(undefined)).toBe(null);
  });

  it('should not be able to format to ISO when an invalid string date is informed', () => {
    const toISOFormatted = dateUtil.formatToISO(inputInvalidStringDate);
    expect(toISOFormatted).toBeNull();
  });
});
