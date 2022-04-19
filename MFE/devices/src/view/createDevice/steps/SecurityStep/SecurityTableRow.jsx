import React from 'react';

import { Chip, Radio, TableCell, TableRow, Tooltip, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CopyTextToClipboardButton } from 'sharedComponents/CopyTextToClipboardButton';
import { formatDate } from 'sharedComponents/Utils';
import { useSecurityTableStyles } from './style';

const SecurityTableRow = ({
  fingerprint,
  subjectDN,
  creationDate,
  expirationDate,
  isNew,
  isSelected,
  handleSelectCertificate,
}) => {
  const { t } = useTranslation(['createDevice', 'common']);
  const classes = useSecurityTableStyles();

  return (
    <TableRow
      role='radio'
      tabIndex={-1}
      onClick={handleSelectCertificate}
      hover={!!handleSelectCertificate}
      className={handleSelectCertificate ? classes.clickable : null}
    >
      <TableCell>
        <Radio
          color='primary'
          checked={isSelected}
          onChange={handleSelectCertificate}
          disabled={!handleSelectCertificate}
        />
      </TableCell>

      <TableCell>
        <Box className={classes.fingerprintField}>
          <Tooltip
            title={fingerprint}
            classes={{ tooltip: classes.tooltip }}
            placement='right'
            interactive
            arrow
          >
            <div className={classes.truncatedText}>{fingerprint}</div>
          </Tooltip>
          {isNew ? null : <CopyTextToClipboardButton textToCopy={fingerprint} />}
        </Box>
      </TableCell>

      <TableCell>
        <Tooltip
          title={subjectDN}
          classes={{ tooltip: classes.tooltip }}
          placement='right'
          interactive
          arrow
        >
          <div className={classes.truncatedText}>{subjectDN}</div>
        </Tooltip>
      </TableCell>

      <TableCell>{formatDate(creationDate, 'L LTS')}</TableCell>

      <TableCell colSpan={isNew ? 1 : 2}>{formatDate(expirationDate, 'L LTS')}</TableCell>

      {isNew && (
        <TableCell>
          <Chip size='small' label={t('common:new')} color='primary' />
        </TableCell>
      )}
    </TableRow>
  );
};

SecurityTableRow.propTypes = {
  fingerprint: PropTypes.string.isRequired,
  subjectDN: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  handleSelectCertificate: PropTypes.func,
};

SecurityTableRow.defaultProps = {
  isNew: false,
  handleSelectCertificate: null,
};

export default SecurityTableRow;
