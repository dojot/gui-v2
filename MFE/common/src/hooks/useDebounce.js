import { useRef } from 'react';

/**
 * Creates a generic debouce function.
 *
 * @param {object} options Hook options
 * @param {function} options.startCallback Function called when the debouce started.
 * @param {function} options.stopCallback Function called when the debouce stops.
 * @param {function} options.delay Delay in milliseconds. Default is 600.
 * @returns {function} Debounce function. Calls startCallback, clears the timer, and calls the stopCallback after a delay.
 */
export const useDebounce = ({ stopCallback, startCallback, delay = 600 } = {}) => {
  const timer = useRef(0);

  return (...params) => {
    if (startCallback) startCallback(...params);

    window.clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      if (stopCallback) stopCallback(...params);
    }, delay);
  };
};
