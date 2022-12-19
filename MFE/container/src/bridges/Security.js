import React, { useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { mount } from 'security/Security';

export default () => {
  const ref = useRef(null);
  const history = useHistory();
  const search = history.location?.search;

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, search);
    const unlisten = history.listen(onParentNavigate);
    return () => unlisten();
  }, []);

  return <div style={{ height: '100%', width: '100%' }} ref={ref} />;
};
