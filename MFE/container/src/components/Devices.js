import { mount } from 'devices/Devices'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current)
        history.listen(onParentNavigate)
    }, [])

    return <div style={{height: '100%'}} ref={ref} />
}
