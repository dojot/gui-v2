import React from 'react';

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import PropTypes from 'prop-types';

import useStyles from './style';

const CollapsibleList = ({
  title,
  subtitle,
  caption,
  children,
  isContentVisible,
  isCaptionHighlighted,
  handleToggleContent,
  disabled,
  canToggleContent,
}) => {
  const classes = useStyles({ isContentVisible });

  return (
    <List className={classes.container}>
      <ListItem
        className={classes.header}
        disabled={disabled}
        onClick={canToggleContent ? handleToggleContent : null}
        data-testid='collapsible-list-header'
        disableGutters
      >
        <ListItemText
          className={classes.title}
          primary={
            <Typography component='span'>
              <Box component='span' marginRight={1}>
                {title}
              </Box>

              {caption && (
                <Typography
                  component='i'
                  variant='caption'
                  color={isCaptionHighlighted ? 'primary' : 'inherit'}
                >
                  {isCaptionHighlighted ? <strong>{caption}</strong> : caption}
                </Typography>
              )}
            </Typography>
          }
          secondary={
            subtitle && (
              <Typography variant='body2' color='primary'>
                {subtitle}
              </Typography>
            )
          }
        />

        <ListItemIcon>
          <ChevronRight className={classes.icon} />
        </ListItemIcon>
      </ListItem>

      <Collapse in={isContentVisible} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
};

CollapsibleList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node.isRequired,
  isContentVisible: PropTypes.bool.isRequired,
  isCaptionHighlighted: PropTypes.bool,
  handleToggleContent: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  canToggleContent: PropTypes.bool,
};

CollapsibleList.defaultProps = {
  isCaptionHighlighted: false,
  subtitle: '',
  caption: '',
  disabled: false,
  canToggleContent: true,
};

export default CollapsibleList;
