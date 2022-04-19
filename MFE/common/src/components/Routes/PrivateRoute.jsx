import React, { Suspense } from 'react';

import { MainLayout } from 'Components/Layouts';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'Utils';
import { CircularIndeterminate } from '../Loading';
import { ErrorBoundary } from 'Components/Utilities'

export default ({ component: Component, attrs, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <MainLayout {...attrs}>
                        <ErrorBoundary>
                            <Suspense fallback={
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <CircularIndeterminate/>
                                </div>
                            }>
                                <Component {...props} />
                            </Suspense>
                        </ErrorBoundary>
                    </MainLayout>
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
                )
            }
        />
    );
};
