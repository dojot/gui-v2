import { useEffect } from 'react';

const useWindowEventListener = (eventName, eventHandler) => {
    useEffect(() => {
        window.addEventListener(eventName, eventHandler);
        return () => window.removeEventListener(eventName, eventHandler, false);
    }, []);
};

export const dispatchEvent = (event, data) => window.dispatchEvent(new CustomEvent(event, { detail: data }));

export default useWindowEventListener;
