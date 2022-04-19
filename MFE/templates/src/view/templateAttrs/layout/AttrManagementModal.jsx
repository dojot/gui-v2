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
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DialogHeader } from 'sharedComponents/Dialogs';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from 'sharedComponents/Constants';
import { useAttrManagementModalStyles } from './style';

const AttrManagementModal = ({ isOpen, attrToEdit, handleHideModal, handleSaveAttr }) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useAttrManagementModalStyles();

  const [label, setLabel] = useState('');
  const [type, setType] = useState('');
  const [valueType, setValueType] = useState('');
  const [staticValue, setStaticValue] = useState('');
  const [saveButtonTouched, setSaveButtonTouched] = useState(false);

  const handleValidateAttr = () => {
    return !!label.trim() && !!type && !!valueType;
  };

  const handleValidateAndSave = () => {
    setSaveButtonTouched(true);
    if (handleValidateAttr()) {
      handleSaveAttr({
        label,
        type,
        valueType,
        staticValue,
      });
    }
  };

  const handleClearState = () => {
    setLabel('');
    setType('');
    setValueType('');
    setStaticValue('');
    setSaveButtonTouched(false);
  };

  useEffect(() => {
    if (isOpen && attrToEdit) {
      setLabel(attrToEdit.label || '');
      setType(attrToEdit.type || '');
      setValueType(attrToEdit.valueType || '');
      setStaticValue(attrToEdit.staticValue || '');
    }
  }, [attrToEdit, isOpen]);

  useEffect(() => {
    if (!isOpen) setTimeout(handleClearState, 100);
  }, [isOpen]);

  useEffect(() => {
    if (type !== TEMPLATE_ATTR_TYPES.STATIC.value) {
      setStaticValue('');
    }
  }, [type]);

  return (
    <Dialog open={isOpen} onClose={handleHideModal} maxWidth='md' fullWidth>
      <DialogHeader
        title={t(attrToEdit ? 'attrManagement.editAttr' : 'attrManagement.newAttr')}
        handleHideDialog={handleHideModal}
      />

      <Box padding={2}>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <TextField
              value={label}
              variant='outlined'
              error={saveButtonTouched && !label.trim()}
              label={`${t('attrs:attrLabel.attrLabel')} *`}
              onChange={e => setLabel(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel variant='outlined' id='attrTypeLabel' error={saveButtonTouched && !type}>
              {`${t('attrs:attrLabel.attrType')} *`}
            </InputLabel>

            <Select
              value={type}
              fullWidth
              variant='outlined'
              labelId='attrTypeLabel'
              error={saveButtonTouched && !type}
              label={`${t('attrs:attrLabel.attrType')} *`}
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
            <InputLabel
              variant='outlined'
              id='attrValueTypeLabel'
              error={saveButtonTouched && !valueType}
            >
              {`${t('attrs:attrLabel.attrValueType')} *`}
            </InputLabel>

            <Select
              value={valueType}
              variant='outlined'
              labelId='attrValueTypeLabel'
              error={saveButtonTouched && !valueType}
              label={`${t('attrs:attrLabel.attrValueType')} *`}
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
              variant='outlined'
              value={staticValue}
              label={t('attrs:attrLabel.attrValue')}
              disabled={type !== TEMPLATE_ATTR_TYPES.STATIC.value}
              onChange={e => setStaticValue(e.target.value)}
            />
          </FormControl>
        </Box>

        {saveButtonTouched && !handleValidateAttr() && (
          <Box marginBottom={2}>
            <Typography className={classes.error}>{t('attrManagement.errorMessage')}</Typography>
          </Box>
        )}

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
  attrToEdit: null,
};

export default AttrManagementModal;
