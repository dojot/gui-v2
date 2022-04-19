import React, { useState } from 'react';

import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { CollapsibleList } from 'sharedComponents/CollapsibleList';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAttrTranslation } from 'sharedComponents/Hooks';
import ActionButtons from '../../layout/ActionButtons';
import { useAttrsStepStyles } from './style';

const AttrsStep = ({
  staticAttrs,
  dynamicAttrs,
  actuatorAttrs,
  staticAttrValues,
  handleGoToNextStep,
  setStaticAttrValues,
  handleGoToPreviousStep,
  handleCancelDeviceCreation,
}) => {
  const { t } = useTranslation(['createDevice', 'attrs']);
  const classes = useAttrsStepStyles();

  const { getAttrValueTypeTranslation } = useAttrTranslation();

  const [isShowingStaticAttrs, setIsShowingStaticAttrs] = useState(true);
  const [isShowingDynamicAttrs, setIsShowingDynamicAttrs] = useState(false);
  const [isShowingActuators, setIsShowingActuators] = useState(false);

  const handleToggleStaticAttrs = () => {
    setIsShowingStaticAttrs(isShowing => !isShowing);
  };

  const handleToggleDynamicAttrs = () => {
    setIsShowingDynamicAttrs(isShowing => !isShowing);
  };

  const handleToggleActuators = () => {
    setIsShowingActuators(isShowing => !isShowing);
  };

  const handleSetAttrValue = (attrId, value) => {
    setStaticAttrValues(currentAttrValues => {
      const attrValuesClone = { ...currentAttrValues };
      attrValuesClone[attrId] = value;
      return attrValuesClone;
    });
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.header} marginBottom={2}>
          <Typography>{t('attrsStep.hint')}</Typography>
        </Box>

        <CollapsibleList
          title={t('attrsStep.staticAttrs', { count: staticAttrs.length })}
          isContentVisible={isShowingStaticAttrs}
          caption={t('attrsStep.editable')}
          handleToggleContent={handleToggleStaticAttrs}
          isCaptionHighlighted
        >
          <Table size='small'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <strong>{t('attrsStep.templateName')}</strong>
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
              {staticAttrs.map(({ id, templateLabel, label, valueType }) => {
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
                    </TableCell>
                  </TableRow>
                );
              })}

              {staticAttrs.length === 0 && (
                <TableRow>
                  <TableCell align='center' colSpan={4}>
                    {t('attrsStep.noStaticAttrs')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CollapsibleList>

        <CollapsibleList
          title={t('attrsStep.dynamicAttrs', { count: dynamicAttrs.length })}
          isContentVisible={isShowingDynamicAttrs}
          caption={t('attrsStep.nonEditable')}
          handleToggleContent={handleToggleDynamicAttrs}
        >
          <Table size='small'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <strong>{t('attrsStep.templateName')}</strong>
                </TableCell>

                <TableCell>
                  <strong>{t('attrs:attrLabel.attrLabel')}</strong>
                </TableCell>

                <TableCell>
                  <strong>{t('attrs:attrLabel.attrValueType')}</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className={classes.tableBody}>
              {dynamicAttrs.map(({ id, templateLabel, label, valueType }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{templateLabel}</TableCell>
                    <TableCell>{label}</TableCell>
                    <TableCell>{getAttrValueTypeTranslation(valueType)}</TableCell>
                  </TableRow>
                );
              })}

              {dynamicAttrs.length === 0 && (
                <TableRow>
                  <TableCell align='center' colSpan={3}>
                    {t('attrsStep.noDynamicAttrs')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CollapsibleList>

        <CollapsibleList
          title={t('attrsStep.actuators', { count: actuatorAttrs.length })}
          isContentVisible={isShowingActuators}
          caption={t('attrsStep.nonEditable')}
          handleToggleContent={handleToggleActuators}
        >
          <Table size='small'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <strong>{t('attrsStep.templateName')}</strong>
                </TableCell>

                <TableCell>
                  <strong>{t('attrs:attrLabel.attrLabel')}</strong>
                </TableCell>

                <TableCell>
                  <strong>{t('attrs:attrLabel.attrValueType')}</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className={classes.tableBody}>
              {actuatorAttrs.map(({ id, templateLabel, label, valueType }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{templateLabel}</TableCell>
                    <TableCell>{label}</TableCell>
                    <TableCell>{getAttrValueTypeTranslation(valueType)}</TableCell>
                  </TableRow>
                );
              })}

              {actuatorAttrs.length === 0 && (
                <TableRow>
                  <TableCell align='center' colSpan={3}>
                    {t('attrsStep.noActuatorAttrs')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CollapsibleList>
      </Box>

      <ActionButtons
        handleClickNextButton={handleGoToNextStep}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        withBackButton
      />
    </Box>
  );
};

AttrsStep.propTypes = {
  staticAttrs: PropTypes.array.isRequired,
  dynamicAttrs: PropTypes.array.isRequired,
  actuatorAttrs: PropTypes.array.isRequired,
  staticAttrValues: PropTypes.object.isRequired,
  handleGoToNextStep: PropTypes.func.isRequired,
  setStaticAttrValues: PropTypes.func.isRequired,
  handleGoToPreviousStep: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default AttrsStep;
