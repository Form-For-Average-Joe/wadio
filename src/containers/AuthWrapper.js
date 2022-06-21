import { Box, Typography } from "@mui/material";
import { useSigninCheck } from 'reactfire';

const defaultFallback = (
  <Box>
    <Typography sx={{ width: '100vw', height: '100vh' }} align='center' variant={"h2"}>Sign in to view
      this
      page!</Typography>
  </Box>);

const AuthWrapper = ({ children }) => {
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
  return defaultFallback;
};

export default AuthWrapper;