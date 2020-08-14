import React, { PureComponent } from 'react';

import styles from './Loading.css';

class Loading extends PureComponent {
  getMessage() {
    const { isLoading, timedOut, pastDelay, error } = this.props;

    const errorMessage =
      'We can&apos;t pull up information at this point, please try again.';

    if (isLoading) {
      if (timedOut) {
        return <div id="loading-timeout">{errorMessage}</div>;
      }
      if (pastDelay) {
        return (
          <div id="loading-spinner" className={styles.loader}>
            Loading...
          </div>
        );
      }
      return null;
    }
    if (error) {
      return <div id="loading-error">{errorMessage}</div>;
    }

    return null;
  }

  render() {
    return this.getMessage();
  }
}

export default Loading;
