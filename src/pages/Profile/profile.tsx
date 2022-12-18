import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IArtist, ICard } from '../../interfaces';
import b from 'b_';

import './profile.scss';
import Avatar from '@mui/material/Avatar';

export const Profile = () => {
  const { id } = useParams();
  const [events, setEvents] = useState<ICard[]>([]);
  const [artist, setArtist] = useState<IArtist | undefined>(undefined);

  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
      });

    fetch('/json/dict.json')
      .then((res) => res.json())
      .then((res: { artists: IArtist[] }) => {
        const art = res.artists.find(({ id: artistId }) => Number(id) === Number(artistId));
        console.log({ res, art });
        if (art) {
          setArtist(art);
        }
      });
  }, [id]);

  console.log({ id });

  return (
    <section className={b('profile')}>
      {artist && (
        <div className={b('top')}>
          <div className={b('top', 'wrapper')}>
            <Avatar
              alt='name'
              className={b('top', 'avatar')}
              sx={{ width: '100%', height: '100%' }}
            ></Avatar>
            <div className={b('top', 'title')}>
              <h2 className={b('top', 'name')}>{artist?.title}</h2>
              <p className={b('top', 'profession')}>Стендап комик</p>
              <button className={b('top', 'follow-btn')}>Follow</button>
            </div>
          </div>

          <span className={b('top', 'description')}>
            Lorem ipsum dolor sit amet consectetur. Nam convallis aliquet est massa adipiscing
            viverra. Tortor dui vitae eu feugiat nec nisl. Egestas tristique sollicitudin purus
            nibh. Nullam adipiscing aliquam proin id eget rhoncus fames odio.
          </span>
        </div>
      )}
    </section>
  );
};
