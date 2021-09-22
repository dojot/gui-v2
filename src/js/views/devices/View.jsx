import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import Cards from './Cards';
import { VIEW_MODE } from './constants';
import DataTable from './DataTable';
import SearchBar from './SearchBar';

const Devices = () => {
  const { t } = useTranslation('devices');

  const [viewMode, setViewMode] = useState(VIEW_MODE.CARD);
  const [devices] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <SearchBar handleChangeViewMode={setViewMode} viewMode={viewMode} />
      {viewMode === VIEW_MODE.TABLE ? <DataTable devices={devices} /> : <Cards devices={devices} />}
    </ViewContainer>
  );
};

export default Devices;
