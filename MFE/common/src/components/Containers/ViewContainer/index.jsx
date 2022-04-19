import React, { useState } from 'react';

import { AppHeader } from 'Components/Header';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { EVENT } from 'Constants';
import { useTranslation } from 'react-i18next';
import { dispatchEvent, useWindowEventListener } from 'Hooks';
import { getMenuState } from '../../../../adapters/localStorage/config.localStorage';

import { UserInfo } from 'Components/UserInfo';

const ViewContainer = ({ headerTitle, headerContent, children }) => {
    const { t } = useTranslation('common');
    const [isMenuOpen, setMenuOpen] = useState(getMenuState());
    const handleMenu = e => {
        setMenuOpen(!e.detail);
    };
    useWindowEventListener(EVENT.CHANGE_MENU, handleMenu);
    return (
        <>
            <Helmet title={`${headerTitle} · ${t('dojotPageTitle')}`}/>
            <AppHeader isOpen={isMenuOpen} handleClick={() => {
                dispatchEvent(EVENT.CHANGE_MENU, isMenuOpen)
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'))
                }, 200)
            }}
                       title={headerTitle}>
                {headerContent && headerContent()}
                <UserInfo/>
            </AppHeader>
            {children}
        </>
    );
};

ViewContainer.propTypes = {
    headerTitle: PropTypes.string.isRequired,
    headerContent: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ViewContainer.defaultProps = {
    headerContent: () => null,
    children: null,
};

export default (ViewContainer);
