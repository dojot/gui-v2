import { useCallback } from 'react';

import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { CERTIFICATE_STATUS, CERTIFICATE_STATUS_COLORS } from '../constants';

export const useCertificateComputedData = () => {
  const { t } = useTranslation('constants');

  const handleGetCertificateComputedData = useCallback(
    validity => {
      if (!validity) {
        return {
          validityInitialDate: '',
          validityFinalDate: '',
          status: CERTIFICATE_STATUS.VALID,
          statusText: t(`certificateStatus.${CERTIFICATE_STATUS.VALID}`),
          statusColor: CERTIFICATE_STATUS_COLORS[CERTIFICATE_STATUS.VALID],
        };
      }

      const { notBefore, notAfter } = validity;

      const validityInitialDate = notBefore ? moment(notBefore).format('L') : '';
      const validityFinalDate = notAfter ? moment(notAfter).format('L') : '';

      const isExpired = notAfter ? moment().isAfter(notAfter, 'days') : false;
      const isAboutToExpire = notAfter ? moment(notAfter).isSame(moment(), 'days') : false;

      let status = CERTIFICATE_STATUS.VALID;
      if (isExpired) status = CERTIFICATE_STATUS.EXPIRED;
      else if (isAboutToExpire) status = CERTIFICATE_STATUS.ABOUT_TO_EXPIRE;

      return {
        validityInitialDate,
        validityFinalDate,
        status,
        statusText: t(`certificateStatus.${status}`),
        statusColor: CERTIFICATE_STATUS_COLORS[status],
      };
    },
    [t],
  );

  return handleGetCertificateComputedData;
};
