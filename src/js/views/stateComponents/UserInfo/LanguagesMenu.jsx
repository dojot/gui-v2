import React from 'react';

import {
  Grow,
  List,
  Paper,
  Popper,
  ListItem,
  ListItemText,
  ClickAwayListener,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const LanguagesMenu = ({
  languages,
  anchorElement,
  isShowingLanguagesMenu,
  handleChangeLanguage,
  handleHideLanguagesMenu,
  handleClickAwayLanguagesMenu,
}) => {
  const { t, i18n } = useTranslation('languages');
  const classes = useStyles();

  return (
    <Popper
      open={isShowingLanguagesMenu}
      anchorEl={anchorElement}
      placement='bottom-end'
      disablePortal
      transition
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClickAwayLanguagesMenu}>
              <List className={classes.list}>
                {languages.map(language => {
                  const isSelected = i18n.language === language;

                  const handleSelectThisLanguage = () => {
                    handleHideLanguagesMenu();
                    handleChangeLanguage(language);
                  };

                  return (
                    <ListItem
                      key={language}
                      className={isSelected ? classes.selectedListItem : classes.clickableListItem}
                      data-testid={`language-item-${language}`}
                      onClick={handleSelectThisLanguage}
                    >
                      <ListItemText>{t(language)}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

LanguagesMenu.propTypes = {
  languages: PropTypes.array.isRequired,
  anchorElement: PropTypes.object,
  isShowingLanguagesMenu: PropTypes.bool,
  handleChangeLanguage: PropTypes.func.isRequired,
  handleHideLanguagesMenu: PropTypes.func.isRequired,
  handleClickAwayLanguagesMenu: PropTypes.func.isRequired,
};

LanguagesMenu.defaultProps = {
  anchorElement: document.body,
  isShowingLanguagesMenu: false,
};

export default LanguagesMenu;
