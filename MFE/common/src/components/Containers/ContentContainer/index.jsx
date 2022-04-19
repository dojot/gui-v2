import React from 'react';

import { useStyles } from '../RootContainer/style';

const Index = props => {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.content}>{children}</div>;
};

export default Index;
