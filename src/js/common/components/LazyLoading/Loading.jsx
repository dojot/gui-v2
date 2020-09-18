import React, { PureComponent } from 'react';

import styles from './Loading.css';

class Loading extends PureComponent {
  getMessage() {
    const { isLoading, timedOut, pastDelay, error } = this.props;

    const errorMessage =
      'We can&apos;t pull up information at this point, please try again.';

    if (isLoading) {
      if (timedOut) {
        return <div data-testid='loading-timeout'>{errorMessage}</div>;
      }
      if (pastDelay) {
        return (
          <div data-testid='loading-spinner' className={styles.loader}>
            Loading...
          </div>
        );
      }
      return null;
    }
    if (error) {
      return <div data-testid='loading-error'>{errorMessage}</div>;
    }

    return null;
  }

  render() {
    return this.getMessage();
  }
}

export default Loading;
