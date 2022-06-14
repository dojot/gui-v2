import React from 'react';

import { Box, Button } from '@material-ui/core';
import { CollapsibleList } from 'sharedComponents/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';

const CreateCertificateOneClick = ({
  isShowing,
  certificateData,
  handleToggleContent,
  handleCreateCertificateOneClick,
}) => {
  const { t } = useTranslation('createCertificate');

  return (
    <CollapsibleList
      title={t('createCertificateOneClick.title')}
      subtitle={t('createCertificateOneClick.subTitle')}
      isContentVisible={isShowing}
      canToggleContent={!certificateData}
      disabled={!!certificateData && !isShowing}
      handleToggleContent={handleToggleContent}
    >
      <Box padding={4} paddingTop={3}>
        {!certificateData ? (
          <Button
            onClick={handleCreateCertificateOneClick}
            variant='contained'
            color='primary'
            size='large'
          >
            {t('createCertificateOneClick.createWithOneClick')}
          </Button>
        ) : (
          <GeneratedCertificateResume certificateData={certificateData} />
        )}
      </Box>
    </CollapsibleList>
  );
};

CreateCertificateOneClick.propTypes = {
  isShowing: PropTypes.bool,
  certificateData: PropTypes.object,
  handleToggleContent: PropTypes.func,
  handleCreateCertificateOneClick: PropTypes.func,
};

CreateCertificateOneClick.defaultProps = {
  isShowing: false,
  certificateData: null,
  handleToggleContent: null,
  handleCreateCertificateOneClick: null,
};

export default CreateCertificateOneClick;
