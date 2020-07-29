import React, { Fragment } from 'react';

import { AppHeader } from 'Components/Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as layoutActions } from 'Redux/base';
import { menuSelector } from 'Selectors/baseSelector';

import { UserInfo } from './UserInfo';

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
        <UserInfo />
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
  ...layoutActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
