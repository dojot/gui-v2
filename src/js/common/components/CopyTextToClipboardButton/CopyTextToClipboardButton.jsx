import React, { useState } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { Done, FileCopyOutlined } from '@material-ui/icons';
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
    <Tooltip open={isShowingSuccessTooltip} title={t('copiedToClipboard')} arrow placement='top'>
      <IconButton
        color={isShowingSuccessTooltip ? 'secondary' : 'default'}
        onClick={isShowingSuccessTooltip ? null : copyToClipboard}
        size='small'
      >
        {isShowingSuccessTooltip ? <Done /> : <FileCopyOutlined />}
      </IconButton>
    </Tooltip>
  );
};

CopyTextToClipboardButton.propTypes = {
  textToCopy: PropTypes.string.isRequired,
};

export default CopyTextToClipboardButton;
