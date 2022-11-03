import React from 'react';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import { ViewModule, List, Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { VIEW_MODE } from 'sharedComponents/Constants';

import { useSearchBarStyles } from './style';

const SearchBar = ({ viewMode, handleChangeViewMode, handleCreationClick }) => {
  const { t } = useTranslation(['flows', 'common']);
  const classes = useSearchBarStyles();

  return (
    <Box className={classes.searchContainer} paddingY={1} paddingX={2} margin={0}>
      <Box className={classes.leftSide}>
        <Tooltip title={t('common:viewList')} arrow className={classes.tooltip}>
          <IconButton
            color={viewMode === VIEW_MODE.TABLE ? 'primary' : 'default'}
            onClick={() => handleChangeViewMode(VIEW_MODE.TABLE)}
          >
            <List />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('common:viewGrid')} arrow className={classes.tooltip}>
          <IconButton
            color={viewMode === VIEW_MODE.CARD ? 'primary' : 'default'}
            onClick={() => handleChangeViewMode(VIEW_MODE.CARD)}
          >
            <ViewModule />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip placement='left' title={t('createNewFlow')} arrow>
        <IconButton
          className={classes.createButton}
          color='primary'
          aria-label={t('createNewFlow')}
          onClick={handleCreationClick}
        >
          <Add />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

SearchBar.propTypes = {
  viewMode: PropTypes.oneOf(Object.values(VIEW_MODE)),
  handleCreationClick: PropTypes.func,
  handleChangeViewMode: PropTypes.func,
};

SearchBar.defaultProps = {
  viewMode: VIEW_MODE.TABLE,
  handleChangeViewMode: null,
  handleCreationClick: null,
};

export default SearchBar;
