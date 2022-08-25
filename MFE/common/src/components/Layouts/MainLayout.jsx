import React from 'react';

import { ContentContainer, RootContainer } from 'Components/Containers';

export default ({ isMenuOpen, children }) => {
  return (
    <RootContainer>
      <ContentContainer isMenuOpen={isMenuOpen}>{children}</ContentContainer>
    </RootContainer>
  );
};
