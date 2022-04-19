import React from 'react';

import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CollapsibleList } from 'sharedComponents/CollapsibleList';
import { TEMPLATE_ATTR_TYPES } from 'sharedComponents/Constants';
import { useAttrTranslation } from 'sharedComponents/Hooks';
import { useAttrsTableStyles } from './style';

const AttrsTable = ({
  attrs,
  isShowingAttrs,
  staticAttrValues,
  handleToggleAttrs,
  handleSetAttrValue,
}) => {
  const { t } = useTranslation('editDevice');
  const classes = useAttrsTableStyles();

  const { getAttrValueTypeTranslation } = useAttrTranslation();

  return (
    <CollapsibleList
      title={t('attrsTableTitle', { count: attrs.length })}
      caption={t('attrsTableCaption')}
      isContentVisible={isShowingAttrs}
      handleToggleContent={handleToggleAttrs}
    >
      <Table size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <strong>{t('templateName')}</strong>
            </TableCell>

            <TableCell>
              <strong>{t('attrs:attrLabel.attrLabel')}</strong>
            </TableCell>

            <TableCell>
              <strong>{t('attrs:attrLabel.attrValueType')}</strong>
            </TableCell>

            <TableCell>
              <strong>{t('attrs:attrLabel.attrValue')}</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={classes.tableBody}>
          {attrs.map(({ id, templateLabel, type, label, valueType }) => {
            const isStaticAttr = type === TEMPLATE_ATTR_TYPES.STATIC.value;
            const attrValue = staticAttrValues[id] || '';

            const handleUpdateValue = newValue => {
              handleSetAttrValue(id, newValue);
            };

            const handleClearValue = () => {
              handleSetAttrValue(id, '');
            };

            return (
              <TableRow key={id}>
                <TableCell>{templateLabel}</TableCell>
                <TableCell>{label}</TableCell>
                <TableCell>{getAttrValueTypeTranslation(valueType)}</TableCell>

                <TableCell>
                  {isStaticAttr && (
                    <TextField
                      className={classes.input}
                      size='small'
                      variant='outlined'
                      value={attrValue}
                      placeholder={t('attrs:attrLabel.attrValue')}
                      onChange={e => handleUpdateValue(e.target.value)}
                      InputProps={{
                        endAdornment: attrValue ? (
                          <InputAdornment position='end'>
                            <IconButton onClick={handleClearValue} size='small'>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}

          {attrs.length === 0 && (
            <TableRow>
              <TableCell align='center' colSpan={4}>
                {t('noAttrs')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollapsibleList>
  );
};

AttrsTable.propTypes = {
  attrs: PropTypes.array.isRequired,
  isShowingAttrs: PropTypes.bool.isRequired,
  staticAttrValues: PropTypes.object.isRequired,
  handleToggleAttrs: PropTypes.func.isRequired,
  handleSetAttrValue: PropTypes.func.isRequired,
};

export default AttrsTable;
