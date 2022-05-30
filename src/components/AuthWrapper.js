import * as React from 'react';
import { useSigninCheck } from 'reactfire';

// Use this wrapper to paywall our users
export const AuthWrapper = ({ children, fallback }) => {
  const { status, data } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    //todo loadingSpinner
  } else if (data.signedIn === true) {
    return children;
  }
  return fallback;
};