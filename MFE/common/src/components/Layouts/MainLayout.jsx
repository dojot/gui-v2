import React from 'react';

import { ContentContainer, RootContainer } from 'Components/Containers';
import { Drawer } from 'Components/Drawer';

import { MENU_ITEMS } from '../../menu';

export default ({ isMenuOpen, children }) => {
    return (
        <RootContainer>
            <Drawer isOpen={isMenuOpen} menuItems={MENU_ITEMS}/>
            <ContentContainer>{children}</ContentContainer>
        </RootContainer>
    );
};
