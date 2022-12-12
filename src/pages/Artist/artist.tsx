import React, { useEffect, useRef, useState } from 'react';
import { CardArtist } from '../../components/Card Artist/CardArtist';

import './artist.scss';
import { ICard } from '../../interfaces';
import { ArtistMobile } from '../../components/Mobile pages/Artist page/artistMobile';
import { useMediaQuery } from 'react-responsive';
import b from 'b_';
import Carousel from '../../components/Carousel cards/carousel';
import dayjs from 'dayjs';

export const Artist = () => {
  const [events, setEvents] = useState([]);
  const [eventsByArtist, setEventsByArtist] = useState<{ [artistId: string]: ICard[] }>({});

  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
      });
  }, []);

  useEffect(() => {
    setEventsByArtist(
      events.reduce((acc, event: ICard) => {
        event.artists.forEach((artist) => {
          acc[artist.id] = acc[artist.id] || [];
          acc[artist.id].push(event);
        });

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events]);

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });

  console.log({ evts: events, eventsByArtist });

  // const eventsByDate = events.

  return (
    <>
      {isBigScreen ? (
        <section className={b('wrapper')}>
          <div className={b('wrapper', 'cards')}>
            <Carousel show={4}>
              {Object.keys(eventsByArtist).map((artistId) => (
                <CardArtist artistId={+artistId} events={eventsByArtist[artistId]} key={artistId} />
              ))}
            </Carousel>
          </div>
        </section>
      ) : (
        <ArtistMobile events={events} />
      )}
    </>
  );
};
