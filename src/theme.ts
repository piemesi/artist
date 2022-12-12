import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    // common: {
    //   black: '#000',
    //   white: '#fff',
    // },
    primary: {
      main: '#f4db71',
      // contrastText: '#000',
    },
    secondary: {
      main: '#a4b0c7',
    },
  },
  // components: {
  //   MuiButtonBase: {
  //     styleOverrides:{
  //
  //     }
  //   },
  // },
  typography: {
    fontFamily: 'IBM Plex Sans',
  },
});
