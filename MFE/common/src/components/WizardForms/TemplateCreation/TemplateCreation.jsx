import React from 'react';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Close, Delete, InfoOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';

import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../../constants';
import { useStyles } from './style';
import AttributeInputLabel from './AttributeInputLabel';

const TemplateCreation = ({
  className,
  attrs,
  title,
  subtitle,
  templateLabel,
  setTemplateLabel,
  handleCreateAttr,
  handleDeleteAttr,
  handleUpdateAttr,
  endExtraComponent,
  showRequiredHint,
}) => {
  const { t } = useTranslation(['templateCreation', 'attrs']);
  const classes = useStyles();

  const handleClearTemplateLabel = () => {
    setTemplateLabel('');
  };

  return (
    <Box className={`${classes.container} ${className}`} padding={2}>
      <Box marginBottom={2}>
        <Typography className={classes.title} variant='h6'>
          {title || t('title')}
        </Typography>

        <Typography variant='subtitle2'>{subtitle || t('subtitle')}</Typography>

        {showRequiredHint && <Typography variant='subtitle2'>{t('requiredHint')}</Typography>}
      </Box>

      <Box marginBottom={2}>
        <TextField
          className={classes.input}
          onChange={e => setTemplateLabel(e.target.value)}
          label={t('templateLabelPh')}
          value={templateLabel}
          variant='outlined'
          InputProps={{
            endAdornment: templateLabel ? (
              <InputAdornment position='end'>
                <IconButton onClick={handleClearTemplateLabel}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          required
        />
      </Box>

      <Box marginBottom={2}>
        <Button color='secondary' variant='outlined' size='large' onClick={handleCreateAttr}>
          {t('createAttrButton')}
        </Button>
      </Box>

      <Box className={classes.tableWrapper}>
        {attrs.length > 0 && (
          <Table size='small'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <Tooltip
                    arrow
                    classes={{ tooltip: classes.tooltip }}
                    title={<Trans t={t} i18nKey='attrs:attrLabelHint' />}
                    placement='top-start'
                  >
                    <Box display='flex' alignItems='center'>
                      <strong>{t('attrs:attrLabel.attrLabel')}</strong>
                      &nbsp;
                      <span>*</span>
                      &nbsp;
                      <InfoOutlined fontSize='small' />
                    </Box>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip
                    arrow
                    classes={{ tooltip: classes.tooltip }}
                    title={<Trans t={t} i18nKey='attrs:attrTypeHint' />}
                    placement='top-start'
                  >
                    <Box display='flex' alignItems='center'>
                      <strong>{t('attrs:attrLabel.attrType')}</strong>
                      &nbsp;
                      <span>*</span>
                      &nbsp;
                      <InfoOutlined fontSize='small' />
                    </Box>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip
                    arrow
                    classes={{ tooltip: classes.tooltip }}
                    title={t('attrs:valueTypeHint')}
                    placement='top-start'
                  >
                    <Box display='flex' alignItems='center'>
                      <strong>{t('attrs:attrLabel.attrValueType')}</strong>
                      &nbsp;
                      <span>*</span>
                      &nbsp;
                      <InfoOutlined fontSize='small' />
                    </Box>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip
                    arrow
                    classes={{ tooltip: classes.tooltip }}
                    title={t('attrs:attrValueHint')}
                    placement='top-start'
                  >
                    <Box display='flex' alignItems='center'>
                      <strong>{t('attrs:attrLabel.attrValue')}</strong>
                      &nbsp;
                      <InfoOutlined fontSize='small' />
                    </Box>
                  </Tooltip>
                </TableCell>

                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {attrs.map(({ id, label, type, valueType, staticValue }, index) => {
                const isStaticAttr = type === TEMPLATE_ATTR_TYPES.STATIC.value;

                const handleUpdateLabel = newLabel => {
                  handleUpdateAttr(index, 'label', newLabel);
                };

                const handleUpdateType = newType => {
                  if (isStaticAttr && newType !== type) {
                    handleUpdateAttr(index, 'staticValue', '');
                  }
                  handleUpdateAttr(index, 'type', newType);
                };

                const handleUpdateValueType = newValueType => {
                  handleUpdateAttr(index, 'valueType', newValueType);
                };

                const handleUpdateValue = newStaticValue => {
                  handleUpdateAttr(index, 'staticValue', newStaticValue);
                };

                return (
                  <TableRow key={id}>
                    <TableCell className={classes.tableCell}>
                      <AttributeInputLabel
                        className={classes.input}
                        value={label}
                        placeholder={t('attrs:attrLabel.attrLabel')}
                        handleUpdateLabel={handleUpdateLabel}
                        helperText={t('attrs:attrLabelHint')}
                      />
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Select
                        className={classes.select}
                        value={type}
                        variant='outlined'
                        onChange={e => handleUpdateType(e.target.value)}
                        autoWidth
                      >
                        {Object.values(TEMPLATE_ATTR_TYPES).map(attrType => {
                          return (
                            <MenuItem key={attrType.value} value={attrType.value}>
                              {t(attrType.translation)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Select
                        className={classes.select}
                        value={valueType}
                        variant='outlined'
                        onChange={e => handleUpdateValueType(e.target.value)}
                        autoWidth
                      >
                        {Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(attrValueType => {
                          return (
                            <MenuItem key={attrValueType.value} value={attrValueType.value}>
                              {t(attrValueType.translation)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      {isStaticAttr && (
                        <TextField
                          className={classes.input}
                          size='small'
                          variant='outlined'
                          value={staticValue}
                          placeholder={t('attrs:attrLabel.attrValue')}
                          onChange={e => handleUpdateValue(e.target.value)}
                        />
                      )}
                    </TableCell>

                    <TableCell align='right'>
                      <IconButton onClick={() => handleDeleteAttr(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {attrs.length === 0 && (
          <Box className={classes.noAttr}>
            <Typography variant='body2'>{t('noAttr')}</Typography>
          </Box>
        )}
      </Box>

      {endExtraComponent}
    </Box>
  );
};

TemplateCreation.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  attrs: PropTypes.array.isRequired,
  templateLabel: PropTypes.string.isRequired,
  endExtraComponent: PropTypes.node,
  showRequiredHint: PropTypes.bool,
  setTemplateLabel: PropTypes.func.isRequired,
  handleCreateAttr: PropTypes.func.isRequired,
  handleDeleteAttr: PropTypes.func.isRequired,
  handleUpdateAttr: PropTypes.func.isRequired,
};

TemplateCreation.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
  endExtraComponent: null,
  showRequiredHint: true,
};

export default TemplateCreation;
