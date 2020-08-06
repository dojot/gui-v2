import React, { useEffect, useState, useCallback } from 'react';

import { ContentContainer, RootContainer } from 'Components/Containers';
import { Drawer } from 'Components/Drawer';
import { useTranslation } from 'react-i18next';

import { helper, primary } from '../../menu';

export default ({ isMenuOpen, children }) => {
  const [primaryItems, setPrimaryItems] = useState([]);
  const [secondaryItems, setSecondarytems] = useState([]);

  const { t } = useTranslation(['menu']);

  const translate = useCallback(
    items => {
      return items.map(item => ({
        ...item,
        label: t(`menu:${item.i18n}`),
      }));
    },
    [t],
  );

  useEffect(() => {
    setPrimaryItems(translate(primary));
    setSecondarytems(translate(helper));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootContainer>
      <Drawer
        isOpen={isMenuOpen}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
      />
      <ContentContainer>{children}</ContentContainer>
    </RootContainer>
  );
};
