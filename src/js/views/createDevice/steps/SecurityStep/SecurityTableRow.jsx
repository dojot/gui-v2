import React from 'react';

import { Chip, Radio, TableCell, TableRow, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { formatDate } from '../../../../common/utils';
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
        <Tooltip
          title={fingerprint}
          classes={{ tooltip: classes.tooltip }}
          placement='right'
          interactive
          arrow
        >
          <div className={classes.truncatedText}>{fingerprint}</div>
        </Tooltip>
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

      <TableCell>{formatDate(creationDate, 'DD/MM/YYYY HH:mm:ss')}</TableCell>

      <TableCell colSpan={isNew ? 1 : 2}>
        {formatDate(expirationDate, 'DD/MM/YYYY HH:mm:ss')}
      </TableCell>

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
