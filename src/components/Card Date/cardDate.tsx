import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import b from 'b_';
import dayjs from 'dayjs';
import notification from 'icons/notification.svg';
import { CardList } from '../../shared/cardList';

// TODO
export const CardDate = ({ when, cardStyle, events }: any) => (
  <Card className={`card ${cardStyle}`}>
    <button className={b('card', 'button')}>{dayjs(when).format('D MMMM')}</button>
    <button className={b('card', 'button', { notification: true })}>
      <img src={notification} />
    </button>
    <CardMedia
      key={events.id}
      component='img'
      image='https://www.classy.org/wp-content/uploads/2022/06/blog_x-things-your-in-person-attendees-want-to-see-at-your-fundraising-events_header.jpg'
      alt='artist'
      height='300'
    />
    <CardList events={events} isDatePage />
  </Card>
);
