import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme(theme, {
    typography: {
      TopHeading: {
        color: 'green',
      },
      button: {
        color: green[500],
      }
    }
});

export default textcolor;