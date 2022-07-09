import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
