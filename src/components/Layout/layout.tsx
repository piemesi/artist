import { Header } from '../Header/header';
import { Outlet } from 'react-router-dom';
import { Filters } from 'components/Filters/filters';
import React from 'react';

// import { useMediaQuery } from 'react-responsive';

export const Layout = () => {
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });

  return (
    <main>
      <Header />
      <Filters />
      {/*<Outlet context={isBigScreen} />*/}
      <Outlet />
    </main>
  );
};
