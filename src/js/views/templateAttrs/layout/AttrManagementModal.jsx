import React, { useEffect, useState } from 'react';

import {
  Dialog,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DialogHeader } from '../../../common/components/Dialogs';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../../common/constants';
import { useAttrManagementModalStyles } from './style';

const AttrManagementModal = ({ isOpen, attrToEdit, handleHideModal, handleSaveAttr }) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useAttrManagementModalStyles();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [valueType, setValueType] = useState('');
  const [value, setValue] = useState('');

  const handleValidateAttr = () => {
    return !!name.trim() && !!type && !!valueType;
  };

  const handleValidateAndSave = () => {
    if (handleValidateAttr()) {
      handleSaveAttr({
        name,
        type,
        valueType,
        value,
      });
    }
  };

  useEffect(() => {
    if (isOpen && attrToEdit) {
      setName(attrToEdit.name);
      setType(attrToEdit.type);
      setValueType(attrToEdit.valuetype);
      setValue(attrToEdit.value);
    }
  }, [attrToEdit, isOpen]);

  useEffect(() => {
    return () => {
      setName('');
      setType('');
      setValueType('');
      setValue('');
    };
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleHideModal} maxWidth='md' fullWidth>
      <DialogHeader
        title={t(attrToEdit ? 'attrManagement.newAttr' : 'attrManagement.editATtr')}
        handleHideDialog={handleHideModal}
      />

      <Box padding={2}>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <TextField
              value={name}
              variant='outlined'
              label={t('attrs:attrLabel.attrName')}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel className={classes.selectLabel} id='attrTypeLabel'>
              {t('attrs:attrLabel.attrType')}
            </InputLabel>

            <Select
              value={type}
              fullWidth
              variant='outlined'
              labelId='attrTypeLabel'
              label={t('attrs:attrLabel.attrType')}
              onChange={e => setType(e.target.value)}
            >
              {Object.values(TEMPLATE_ATTR_TYPES).map(attrType => {
                return (
                  <MenuItem key={attrType.value} value={attrType.value}>
                    {t(attrType.translation)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel className={classes.selectLabel} id='attrValueTypeLabel'>
              {t('attrs:attrLabel.attrValueType')}
            </InputLabel>

            <Select
              value={valueType}
              variant='outlined'
              labelId='attrValueTypeLabel'
              label={t('attrs:attrLabel.attrValueType')}
              onChange={e => setValueType(e.target.value)}
            >
              {Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(attrValueType => {
                return (
                  <MenuItem key={attrValueType.value} value={attrValueType.value}>
                    {t(attrValueType.translation)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <TextField
              value={value}
              variant='outlined'
              label={t('attrs:attrLabel.attrValue')}
              onChange={e => setValue(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box className={classes.actions}>
          <Button variant='text' size='large' onClick={handleHideModal}>
            {t('common:cancel')}
          </Button>

          <Button color='primary' size='large' onClick={handleValidateAndSave}>
            {t('common:save')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

AttrManagementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  attrToEdit: PropTypes.object,
  handleHideModal: PropTypes.func.isRequired,
  handleSaveAttr: PropTypes.func.isRequired,
};

AttrManagementModal.defaultProps = {
  attrToEdit: {},
};

export default AttrManagementModal;
