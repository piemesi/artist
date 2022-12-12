import { Layout } from '../components/Layout/layout';
import { Date } from '../pages/Date/date';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Artist } from '../pages/Artist/artist';
import { useMediaQuery } from 'react-responsive';

export const ROUTER_PATHS = {
  ARTISTS: 'artists',
  DATES: 'dates',
};

export const RoutingMap = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={`/${ROUTER_PATHS.ARTISTS}/:genres`} element={<Artist />} />
        {/*<Route path={`/${ROUTER_PATHS.ARTISTS}/:genres/:dates`} element={<ArtistC />} />*/}
        <Route path={`/${ROUTER_PATHS.DATES}/:genres`} element={<Date />} />
      </Route>
    </Routes>
  );
};
