import React from 'react';

import { Box, Button } from '@material-ui/core';
import { CollapsibleList } from 'Components/CollapsibleList';
import { useTranslation } from 'react-i18next';

import GeneratedCertificateResume from './GeneratedCertificateResume';

function CreateCertificateOneClick({
  isShowing,
  handleToggleContent,
  handleCreateCertificateOneClick,
  certificateData,
}) {
  const { t } = useTranslation('createCertificate');

  return (
    <CollapsibleList
      title={t('createCertificateOneClick.title')}
      subtitle={t('createCertificateOneClick.subTitle')}
      isContentVisible={isShowing}
      handleToggleContent={handleToggleContent}
      isCaptionHighlighted
      disabled={!!certificateData && !isShowing}
      canToggleContent={!certificateData}
    >
      <Box padding={4}>
        {!certificateData ? (
          <Button
            onClick={handleCreateCertificateOneClick}
            variant='outlined'
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
}

CreateCertificateOneClick.propTypes = {};

CreateCertificateOneClick.defaultProps = {};

export default CreateCertificateOneClick;
