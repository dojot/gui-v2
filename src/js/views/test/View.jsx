import React, { Component } from 'react';

import { ExampleWithError } from 'Components/Example';
import LazyLoading from 'Components/LazyLoading';
import { ErrorBoundary } from 'Components/Utilities';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions as exampleActions } from 'Redux/example';
import { exampleSelector } from 'Selectors/exampleSelector';

import { ViewContainer } from '../stateComponents';

// This is lazy loading example
const LazyExample = LazyLoading(() => import('Components/Example/Example'));

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
      <ViewContainer headerTitle="TODO Page">
        <LazyExample {...this.props} />
        <h2>This framework supports i18n and i10n out of the box.</h2>
        
        <ErrorBoundary>
          <ExampleWithError {...this.props} />
        </ErrorBoundary>
      </ViewContainer>
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
