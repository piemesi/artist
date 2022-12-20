import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import b from 'b_';
import { IArtist, ICard } from '../../interfaces';
import notification from 'icons/notification.svg';
import { CardList } from '../../shared/card-list';

import './card-artist.scss';
import { Link } from 'react-router-dom';

type IProps = React.PropsWithChildren<{
  artistId: number;
  events: ICard[];
}>;

export const CardArtist = ({ artistId, events }: IProps) => {
  const artist: IArtist = events[0].artists.find(({ id }) => id === artistId)!;

  return (
    <Card className='card' sx={{ boxShadow: 0, borderRadius: 4 }}>
      <Tooltip title={`Go to ${artist.title} page`} placement='top'>
        <button className={b('card', 'button')}>
          <Link to={`/profile/${artist.id}`} className={b('card', 'profile-link')}>
            {artist.title}
          </Link>
        </button>
      </Tooltip>
      <Tooltip title={`Subscribe to ${artist.title} events`}>
        <button className={b('card', 'button', { notification: true })}>
          <img src={notification} alt={`${artist.title}: ${artist.profession}`} />
        </button>
      </Tooltip>
      <CardMedia
        key={artist.id}
        component='img'
        image={artist.main_img}
        alt='artist'
        height='300'
        className={b('card', 'avatar')}
      />
      <CardList events={events} />
    </Card>
  );
};
