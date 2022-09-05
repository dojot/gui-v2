import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './style';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ExpandMore, SubdirectoryArrowRight } from '@material-ui/icons';

const TemplateItem = ({ id, name, type, associateDevices }) => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const { t } = useTranslation('templates');

  const handleToggleCollapse = () => setIsOpen(prevState => !prevState);

  return (
    <Box key={id} className={classes.itemBox}>
      <Box className={classes.headerItemBox}>
        <Typography>
          <strong>{name}</strong>
          <small className={classes.description}>
            <i>
              {type === 'NOT_FOUND' && t('templateNotFound')}
              {type === 'HAS_ASSOCIATED_DEVICES' &&
                t('hasAssociatedDevice', { count: associateDevices.length })}
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
          {type === 'HAS_ASSOCIATED_DEVICES' &&
            associateDevices.map(associatedDevice => (
              <React.Fragment key={associatedDevice.id}>
                <SubdirectoryArrowRight />
                <span>{associatedDevice.name}</span>
                <br />
              </React.Fragment>
            ))}

          {type === 'NOT_FOUND' && <Typography>{t('templateNotFoundMessage')}</Typography>}
        </div>
      </Collapse>
    </Box>
  );
};

TemplateItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  associateDevices: PropTypes.array.isRequired,
};

export default TemplateItem;
