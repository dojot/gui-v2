import React, { useRef, useEffect } from 'react';

import { mount } from 'flows/Flows';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, history);
    const unlisten = history.listen(onParentNavigate);
    return () => unlisten();
  }, []);

  return <div style={{ height: '100%', width: '100%' }} ref={ref} />;
};
