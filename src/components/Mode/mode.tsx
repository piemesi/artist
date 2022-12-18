import React from 'react';
import b from 'b_';

import { NavLink, useParams } from 'react-router-dom';
import './mode.scss';
import { IUrlRouteParams, RouterPath } from '../../interfaces';

export const Mode = () => {
  const { genres, mode } = useParams<IUrlRouteParams>();

  return (
    <section className={b('mode')}>
      <NavLink
        className={(state) =>
          b('mode', 'nav', { active: state.isActive || mode === RouterPath.DATES, left: true })
        }
        to={`/${RouterPath.DATES}/all/${genres || 'all'}`}
      >
        Dates
      </NavLink>
      <NavLink
        className={(state) =>
          b('mode', 'nav', { active: state.isActive || mode === RouterPath.ARTISTS, right: true })
        }
        to={`/${RouterPath.ARTISTS}/all/${genres || 'all'}`}
      >
        Artist
      </NavLink>
    </section>
  );
};
