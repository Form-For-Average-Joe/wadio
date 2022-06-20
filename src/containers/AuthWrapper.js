import { useSigninCheck } from 'reactfire';

const AuthWrapper = ({ children, fallback }) => {
  const { status, data } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    //todo loadingSpinner
    return <p>Loading</p>;
  } else if (data.signedIn === true) {
    return children;
  }
  return fallback;
};

export default AuthWrapper;