import React from 'react';

import { CollapsibleList } from 'sharedComponents/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useHistory } from 'react-router-dom';

const ImportCertificates = ({ certificateData }) => {
  const { t } = useTranslation('createCertificate');
  const history = useHistory();

  const handleGoToImportationPage = () => {
    history.push('/certificates/new/import');
  };

  return (
    <CollapsibleList
      title={t('importCertificates.title')}
      subtitle={t('importCertificates.subTitle')}
      disabled={!!certificateData}
      handleToggleContent={!!certificateData ? null : handleGoToImportationPage}
      isContentVisible={false}
    />
  );
};

ImportCertificates.propTypes = {
  certificateData: PropTypes.object,
};

ImportCertificates.defaultProps = {
  certificateData: null,
};

export default ImportCertificates;
