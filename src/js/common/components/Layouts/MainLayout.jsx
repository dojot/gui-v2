import { ContentContainer, RootContainer } from 'Components/Containers';
import { Drawer } from 'Components/Drawer';
import React from 'react';
import { helper, primary } from '../../menu';

export default ({ isMenuOpen, children }) => {
  return (
    <RootContainer>
      <Drawer
        isOpen={isMenuOpen}
        secondaryItems={helper}
        primaryItems={primary}
      />
      <ContentContainer>{children}</ContentContainer>
    </RootContainer>
  );
};
