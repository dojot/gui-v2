import { act, renderHook } from '@testing-library/react-hooks';

import { useCertificateComputedData } from '..';
import { CERTIFICATE_STATUS, CERTIFICATE_STATUS_COLORS } from '../../constants';

describe('useCertificateComputedData', () => {
  const fakeValidity = {
    notAfter: '2022-01-01T12:00:00.000Z',
    notBefore: '2021-01-01T12:00:00.000Z',
  };

  const formattedDates = {
    initialDate: '01/01/2021',
    finalDate: '01/01/2022',
  };

  const statusDates = {
    valid: fakeValidity.notBefore,
    aboutToExpire: fakeValidity.notAfter,
    expired: '2022-01-02T12:00:00.000Z',
  };

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return a function to get the certificate computed data', () => {
    const { result } = renderHook(() => useCertificateComputedData());
    expect(typeof result.current).toBe('function');
  });

  it('should return the default data when the validity is falsy', () => {
    const { result } = renderHook(() => useCertificateComputedData());

    act(() => {
      expect(result.current()).toMatchObject({
        validityInitialDate: '',
        validityFinalDate: '',
        status: CERTIFICATE_STATUS.VALID,
        statusText: `certificateStatus.${CERTIFICATE_STATUS.VALID}`,
        statusColor: CERTIFICATE_STATUS_COLORS.VALID,
      });
    });
  });

  it('should the dates be in this format: DD/MM/YYYY', () => {
    const { result } = renderHook(() => useCertificateComputedData());

    act(() => {
      expect(result.current(fakeValidity)).toMatchObject({
        validityInitialDate: formattedDates.initialDate,
        validityFinalDate: formattedDates.finalDate,
      });
    });
  });

  it('should the status be valid', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(statusDates.valid));
    const { result } = renderHook(() => useCertificateComputedData());

    act(() => {
      expect(result.current(fakeValidity)).toMatchObject({
        status: CERTIFICATE_STATUS.VALID,
        statusText: `certificateStatus.${CERTIFICATE_STATUS.VALID}`,
        statusColor: CERTIFICATE_STATUS_COLORS.VALID,
      });
    });
  });

  it('should the status be about to expire', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(statusDates.aboutToExpire));
    const { result } = renderHook(() => useCertificateComputedData());

    act(() => {
      expect(result.current(fakeValidity)).toMatchObject({
        status: CERTIFICATE_STATUS.ABOUT_TO_EXPIRE,
        statusText: `certificateStatus.${CERTIFICATE_STATUS.ABOUT_TO_EXPIRE}`,
        statusColor: CERTIFICATE_STATUS_COLORS.ABOUT_TO_EXPIRE,
      });
    });
  });

  it('should the status be expired', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(statusDates.expired));
    const { result } = renderHook(() => useCertificateComputedData());

    act(() => {
      expect(result.current(fakeValidity)).toMatchObject({
        status: CERTIFICATE_STATUS.EXPIRED,
        statusText: `certificateStatus.${CERTIFICATE_STATUS.EXPIRED}`,
        statusColor: CERTIFICATE_STATUS_COLORS.EXPIRED,
      });
    });
  });
});
