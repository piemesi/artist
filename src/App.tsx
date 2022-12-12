import React, { useEffect, useState } from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { RoutingMap } from './routes';

function App() {
  const [dict, setDict] = useState(null);

  useEffect(() => {
    fetch('/json/dict.json')
      .then((res) => res.json())
      .then((res) => {
        setDict(res);
      });
  }, []);

  // console.log({ dict });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <RoutingMap />
      </div>
    </ThemeProvider>
  );
}

export default App;
