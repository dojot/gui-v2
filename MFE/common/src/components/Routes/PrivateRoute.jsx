import React, { Suspense } from 'react';

import { MainLayout } from 'Components/Layouts';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'Utils';
import { CircularIndeterminate } from '../Loading';
import { ErrorBoundary } from 'Components/Utilities';
import { useCheckAuthentication } from 'Hooks';
import { useEffect } from 'react';

export default ({ component: Component, attrs, ...rest }) => {
  const { handleCheckAuth, isCheckingAuth } = useCheckAuthentication();

  useEffect(() => {
    if (isAuthenticated()) return;
    handleCheckAuth();
  }, [handleCheckAuth]);

  if (isCheckingAuth) return null;

  return (
    <Route
      {...rest}
      render={props => (
        <MainLayout {...attrs}>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularIndeterminate />
                </div>
              }
            >
              <Component {...props} />
            </Suspense>
          </ErrorBoundary>
        </MainLayout>
      )}
    />
  );
};
