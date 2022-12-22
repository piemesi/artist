import { Layout } from '../components/Layout/layout';
import { Date } from '../pages/Date/date';
import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Artist } from '../pages/Artist/artist';
import { Profile } from '../pages/Profile/profile';
import { IUrlRouteParams, RouterPath } from '../interfaces';

const ModeRouter = () => {
  const { mode } = useParams<IUrlRouteParams>();
  return mode === RouterPath.DATES ? <Date /> : <Artist />;
};

export const RoutingMap = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={`profile/:id`} element={<Profile />} />

        <Route path={`/:mode/:period/:countries/:genres`} element={<ModeRouter />} />
      </Route>
    </Routes>
  );
};
