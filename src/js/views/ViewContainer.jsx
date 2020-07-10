import { AppHeader } from 'Components/Header';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { actions as layoutActions } from 'Redux/base';
import { menuSelector } from 'Selectors/baseSelector';

const ViewContainer = props => {
  const {
    headerTitle,
    headerContent,
    updateIsMenuOpen,
    isMenuOpen,
    children,
  } = props;

  return (
    <Fragment>
      <AppHeader
        isOpen={isMenuOpen}
        handleClick={updateIsMenuOpen}
        title={headerTitle}
      >
        {headerContent && headerContent()}
      </AppHeader>

      {children}
    </Fragment>
  );
};

ViewContainer.defaultProps = {
  headerContent: () => {
    return null;
  },
};

ViewContainer.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  headerContent: PropTypes.func,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
  ...layoutActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
