import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDeleteMultipleTemplatesErrorAlert } from './style';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ExpandMore, SubdirectoryArrowRight } from '@material-ui/icons';

const TemplateNotExcludedItem = ({ id, label, associated_devices }) => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useDeleteMultipleTemplatesErrorAlert();
  const { t } = useTranslation('templates');

  const handleToggleCollapse = () => setIsOpen(prevState => !prevState);

  return (
    <Box key={id} className={classes.itemBox}>
      <Box className={classes.headerItemBox}>
        <Typography>
          <strong>{label}</strong>
          <small className={classes.description}>
            <i>
              {t('multipleTemplatesDeletionError.hasAssociatedDevice', {
                count: associated_devices.length,
              })}
            </i>
          </small>
        </Typography>

        <IconButton
          size='small'
          onClick={handleToggleCollapse}
          className={clsx(null, {
            [classes.expandIconOpened]: isOpen,
            [classes.expandIconClosed]: !isOpen,
          })}
        >
          <ExpandMore />
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <div className={classes.collapseContent}>
          {associated_devices.map(associatedDevice => (
            <React.Fragment key={associatedDevice.id}>
              <SubdirectoryArrowRight />
              <span>{associatedDevice.label}</span>
              <br />
            </React.Fragment>
          ))}
        </div>
      </Collapse>
    </Box>
  );
};

TemplateNotExcludedItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  associated_devices: PropTypes.array.isRequired,
};

export default TemplateNotExcludedItem;
