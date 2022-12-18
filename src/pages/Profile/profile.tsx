import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IArtist, ICard } from '../../interfaces';
import b from 'b_';

import './profile.scss';
import Avatar from '@mui/material/Avatar';

export const Profile = () => {
  const { profile } = useParams();
  const [events, setEvents] = useState<ICard[]>([]);
  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
      });
  }, []);

  return (
    <section className={b('profile')}>
      <div className={b('top')}>
        <div className={b('top', 'wrapper')}>
          <Avatar
            alt='name'
            className={b('top', 'avatar')}
            sx={{ width: '100%', height: '100%' }}
          ></Avatar>
          <div className={b('top', 'title')}>
            <h2 className={b('top', 'name')}>Name Name</h2>
            <p className={b('top', 'profession')}>Стендап комик</p>
            <button className={b('top', 'follow-btn')}>Follow</button>
          </div>
        </div>

        <span className={b('top', 'description')}>
          Lorem ipsum dolor sit amet consectetur. Nam convallis aliquet est massa adipiscing
          viverra. Tortor dui vitae eu feugiat nec nisl. Egestas tristique sollicitudin purus nibh.
          Nullam adipiscing aliquam proin id eget rhoncus fames odio.
        </span>
      </div>
    </section>
  );
};
