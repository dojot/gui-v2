import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { ExampleWithError } from '../../common/components/Example';
import LazyLoading from '../../common/components/LazyLoading';
import { ErrorBoundary } from '../../common/components/Utilities';
import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';

// This is lazy loading example
const LazyExample = LazyLoading(() =>
  import('../../common/components/Example/Example'),
);

class ExampleView extends Component {
  static propTypes = {
    example: PropTypes.object.isRequired,
  };

  state = {
    myArbitraryNumber: Math.floor(Math.random() * 10000),
    currentTime: new Date(),
  };

  componentDidMount() {
    const { getAwesomeCode } = this.props;

    getAwesomeCode();
  }

  render() {
    const { myArbitraryNumber, currentTime } = this.state;
    // Note for i18n and i10n
    // if `id` is found, it will use the matched message
    // otherwise, it will use defaultMessage as fallback

    return (
      <>
        <LazyExample {...this.props} />
        <h2>This framework supports i18n and i10n out of the box.</h2>
        
        <ErrorBoundary>
          <ExampleWithError {...this.props} />
        </ErrorBoundary>
      </>
    );
  }
}

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...exampleActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleView);
