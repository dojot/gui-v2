import React, { useState } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { Done, FileCopy } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CopyTextToClipboardButton = ({ textToCopy }) => {
  const [isShowingSuccessTooltip, setIsShowingSuccessTooltip] = useState(false);

  const { t } = useTranslation('common');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsShowingSuccessTooltip(true);
    setTimeout(() => {
      setIsShowingSuccessTooltip(false);
    }, 2000);
  };

  return (
    <Tooltip open={isShowingSuccessTooltip} title={t('copiedToClipboard')} arrow placement='down'>
      <IconButton
        color={isShowingSuccessTooltip ? 'secondary' : 'default'}
        onClick={copyToClipboard}
      >
        {isShowingSuccessTooltip ? <Done /> : <FileCopy />}
      </IconButton>
    </Tooltip>
  );
};

CopyTextToClipboardButton.propTypes = {
  textToCopy: PropTypes.string.isRequired,
};

export default CopyTextToClipboardButton;
