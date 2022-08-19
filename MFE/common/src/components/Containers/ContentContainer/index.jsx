import React from 'react';
import { Drawer } from 'Components/Drawer';

import { MENU_ITEMS } from '../../../menu';

import { useStyles } from '../RootContainer/style';

const Index = props => {
  const classes = useStyles();
  const { children, isMenuOpen } = props;
  return (
    <div className={classes.content}>
      <Drawer isOpen={isMenuOpen} menuItems={MENU_ITEMS} />
      {children}
    </div>
  );
};

export default Index;
