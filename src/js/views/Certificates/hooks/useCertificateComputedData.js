import { useCallback } from 'react';

import moment, { useTranslation } from 'react-i18next';

import { CERTIFICATE_STATUS, CERTIFICATE_STATUS_COLORS } from '../../../common/constants';

export const useCertificateComputedData = () => {
  const { t } = useTranslation('certificates');

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

      const validityInitialDate = validity.notBefore
        ? moment(validity.notBefore).format('DD/MM/YYYY')
        : '';

      const validityFinalDate = validity.notAfter
        ? moment(validity.notAfter).format('DD/MM/YYYY')
        : '';

      const isExpired = validity.notAfter
        ? moment(validity.notAfter).isAfter(moment(), 'day')
        : false;

      const isAboutToExpire = validity.notAfter
        ? moment(validity.notAfter).isSame(moment(), 'day')
        : false;

      let status = CERTIFICATE_STATUS.VALID;
      if (isExpired) status = CERTIFICATE_STATUS.EXPIRED;
      else if (isAboutToExpire) status = CERTIFICATE_STATUS.ABOUT_TO_EXPIRE;

      const statusColor = CERTIFICATE_STATUS_COLORS[status];

      return {
        validityInitialDate,
        validityFinalDate,
        status,
        statusText: t(`certificateStatus.${status}`),
        statusColor,
      };
    },
    [t],
  );

  return handleGetCertificateComputedData;
};
