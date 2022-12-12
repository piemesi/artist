import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import b from 'b_';
import { IArtist, ICard } from '../../interfaces';
import notification from 'icons/notification.svg';
import { CardList } from '../../shared/cardList';

import './CardArtist.scss';

type IProps = React.PropsWithChildren<{
  artistId: number;
  events: ICard[];
}>;

export const CardArtist = ({ artistId, events }: IProps) => {
  const artist: IArtist = events[0].artists.find(({ id }) => id === artistId)!;

  return (
    <Card className='card'>
      <Tooltip title={`Go to ${artist.title} page`} placement='top'>
        <button className={b('card', 'button')}>{artist.title}</button>
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
      />
      <CardList events={events} />
    </Card>
  );
};
