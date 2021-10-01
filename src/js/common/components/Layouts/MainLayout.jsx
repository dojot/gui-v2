import React, { useMemo } from 'react';

import { ContentContainer, RootContainer } from 'Components/Containers';
import { Drawer } from 'Components/Drawer';
import { useTranslation } from 'react-i18next';

import { MENU_ITEMS } from '../../menu';

export default ({ isMenuOpen, children }) => {
  const { t } = useTranslation('menu');

  const translatedMenuItems = useMemo(() => {
    return MENU_ITEMS.map(item => {
      return { ...item, label: t(item.i18n) };
    });
  }, [t]);

  return (
    <RootContainer>
      <Drawer isOpen={isMenuOpen} menuItems={translatedMenuItems} />
      <ContentContainer>{children}</ContentContainer>
    </RootContainer>
  );
};
