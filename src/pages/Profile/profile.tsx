import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { profile } = useParams();
  return <h1>Profile</h1>;
};
