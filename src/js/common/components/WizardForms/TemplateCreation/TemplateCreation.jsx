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
  Typography,
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const TemplateCreation = ({
  className,
  attrs,
  templateName,
  setTemplateName,
  handleCreateAttr,
  handleDeleteAttr,
  handleUpdateAttr,
}) => {
  const { t } = useTranslation('templateCreation');
  const classes = useStyles();

  const handleClearTemplateName = () => {
    setTemplateName('');
  };

  return (
    <Box className={`${classes.container} ${className}`} padding={2}>
      <Box marginBottom={2}>
        <Typography className={classes.title} variant='h6'>
          {t('title')}
        </Typography>

        <Typography variant='subtitle2'>{t('subtitle')}</Typography>
      </Box>

      <Box marginBottom={2}>
        <TextField
          className={classes.input}
          onChange={e => setTemplateName(e.target.value)}
          label={t('templateNamePh')}
          value={templateName}
          variant='outlined'
          InputProps={{
            endAdornment: templateName ? (
              <InputAdornment position='end'>
                <IconButton onClick={handleClearTemplateName}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      <Box marginBottom={2}>
        <Button
          className={classes.createAttButton}
          variant='outlined'
          color='primary'
          size='large'
          onClick={handleCreateAttr}
        >
          {t('createAttrButton')}
        </Button>
      </Box>

      <Box className={classes.tableWrapper}>
        <Table size='small'>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>
                <strong>{t('attrTable.attrName')}</strong>
              </TableCell>

              <TableCell>
                <strong>{t('attrTable.attrType')}</strong>
              </TableCell>

              <TableCell>
                <strong>{t('attrTable.attrValueType')}</strong>
              </TableCell>

              <TableCell>
                <strong>{t('attrTable.attrValue')}</strong>
              </TableCell>

              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {attrs.map(({ id, name, type, valueType, value }, index) => {
              const handleUpdateName = newName => {
                handleUpdateAttr(index, 'name', newName);
              };

              const handleUpdateType = newType => {
                handleUpdateAttr(index, 'type', newType);
              };

              const handleUpdateValueType = newValueType => {
                handleUpdateAttr(index, 'valueType', newValueType);
              };

              const handleUpdateValue = newValue => {
                handleUpdateAttr(index, 'value', newValue);
              };

              return (
                <TableRow key={id}>
                  <TableCell>
                    <TextField
                      className={classes.input}
                      size='small'
                      defaultValue={name}
                      variant='outlined'
                      placeholder={t('attrTable.attrName')}
                      onBlur={e => handleUpdateName(e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <Select
                      className={classes.select}
                      value={type}
                      variant='outlined'
                      onChange={e => handleUpdateType(e.target.value)}
                      autoWidth
                    >
                      <MenuItem value='dynamic'>{t('attrType.dynamic')}</MenuItem>
                      <MenuItem value='static'>{t('attrType.static')}</MenuItem>
                      <MenuItem value='actuator'>{t('attrType.actuator')}</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Select
                      className={classes.select}
                      value={valueType}
                      variant='outlined'
                      onChange={e => handleUpdateValueType(e.target.value)}
                      autoWidth
                    >
                      <MenuItem value='bool'>{t('attrValueType.bool')}</MenuItem>
                      <MenuItem value='geo:point'>{t('attrValueType.geo_point')}</MenuItem>
                      <MenuItem value='float'>{t('attrValueType.float')}</MenuItem>
                      <MenuItem value='integer'>{t('attrValueType.integer')}</MenuItem>
                      <MenuItem value='string'>{t('attrValueType.string')}</MenuItem>
                      <MenuItem value='object'>{t('attrValueType.object')}</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <TextField
                      className={classes.input}
                      size='small'
                      defaultValue={value}
                      variant='outlined'
                      placeholder={t('attrTable.attrValue')}
                      onBlur={e => handleUpdateValue(e.target.value)}
                    />
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

        {attrs.length === 0 && (
          <Box className={classes.noAttr}>
            <Typography variant='body2'>{t('noAttr')}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

TemplateCreation.propTypes = {
  className: PropTypes.string,
  attrs: PropTypes.array.isRequired,
  templateName: PropTypes.string.isRequired,
  setTemplateName: PropTypes.func.isRequired,
  handleCreateAttr: PropTypes.func.isRequired,
  handleDeleteAttr: PropTypes.func.isRequired,
  handleUpdateAttr: PropTypes.func.isRequired,
};

TemplateCreation.defaultProps = {
  className: '',
};

export default TemplateCreation;
