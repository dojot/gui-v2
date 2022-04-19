import React, { useState } from 'react';
import { useWindowEventListener } from 'Hooks';
import { ThemeProvider } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import { light, dark } from '../../../themes';

const Index = ({ i18n, children }) => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('THEME') === 'dark');
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.detail.lang);
    };

    const handleThemeChange = (event) => {
        setCurrentTheme(event.detail);
    };

    useWindowEventListener('CHANGE_LANGUAGE', handleLanguageChange);
    useWindowEventListener('CHANGE_THEME', handleThemeChange);

    return (
        <ThemeProvider theme={currentTheme ? dark : light}>
            <I18nextProvider i18n={i18n}>
                {children}
            </I18nextProvider>
        </ThemeProvider>
    );

};

export default Index;
