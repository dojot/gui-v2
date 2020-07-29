import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// This is i18n and i10n
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

import { exampleSelector } from 'Selectors/exampleSelector';
import { actions as exampleActions } from 'Redux/example';
import { ExampleWithError } from 'Components/Example';
import { ErrorBoundary } from 'Components/Utilities';
import LazyLoading from 'Components/LazyLoading';
import ViewContainer from '../StateComponents/ViewContainer';

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
        <p>
          <FormattedMessage
            id="greetings.hello"
            defaultMessage={'Hello {name}'}
            values={{
              name: <b>Visitor</b>,
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="hooray"
            defaultMessage={`A locallized random number: {myArbitraryNumber, number} {myArbitraryNumber, plural,
              one {item}
              other {items}
            }`}
            values={{
              myArbitraryNumber,
            }}
          />
        </p>
        <p>
          The date is: &nbsp;
          <FormattedDate value={currentTime} />
        </p>
        <p>
          The time is: &nbsp;
          <FormattedTime value={currentTime} />
        </p>
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
