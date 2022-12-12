import React from 'react';
import b from 'b_';

import { NavLink, useParams } from 'react-router-dom';
import { ROUTER_PATHS } from '../../routes';
import './mode.scss';

export const Mode = () => {
  const params = useParams();

  return (
    <section className={b('mode')}>
      <NavLink
        className={(state) => b('mode', 'nav', { active: state.isActive, left: true })}
        to={`/${ROUTER_PATHS.DATES}/${params.genres || 'all'}`}
      >
        Dates
      </NavLink>
      <NavLink
        className={(state) => b('mode', 'nav', { active: state.isActive, right: true })}
        to={`/${ROUTER_PATHS.ARTISTS}/${params.genres || 'all'}`}
      >
        Artist
      </NavLink>
    </section>
  );
};
