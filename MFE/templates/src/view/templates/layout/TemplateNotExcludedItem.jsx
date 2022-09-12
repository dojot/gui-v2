import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDeleteMultipleTemplatesErrorAlert } from './style';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ExpandMore, SubdirectoryArrowRight } from '@material-ui/icons';

const TemplateNotExcludedItem = ({ id, label, associateDevices }) => {
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
                count: associateDevices.length,
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
          {associateDevices.map(associatedDevice => (
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
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  associateDevices: PropTypes.array.isRequired,
};

export default TemplateNotExcludedItem;
