import React, { useEffect, useRef, useState } from 'react';
import { CardArtist } from '../../components/Card Artist/CardArtist';

import { ICard, IUrlRouteParams } from '../../interfaces';
import { ArtistMobile } from '../../components/Mobile pages/Artist page/artistMobile';
import { useMediaQuery } from 'react-responsive';
import b from 'b_';
import Carousel from '../../components/Carousel cards/carousel';
import { SliderMobile } from '../../components/Mobile pages/SliderMobile/sliderMobile';

import './artist.scss';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const transformDayjsString = (day: string, isEnd = false): dayjs.Dayjs =>
  dayjs()
    .set('y', Number('20' + day.substring(0, 2)))
    .set('m', Number(day.substring(2, 4)))
    .set('D', Number(day.substring(4)))
    .set('h', isEnd ? 23 : 0)
    .set('m', isEnd ? 59 : 0)
    .set('s', 0);

export const Artist = () => {
  const [events, setEvents] = useState<ICard[]>([]);
  const [eventsByArtist, setEventsByArtist] = useState<{ [artistId: string]: ICard[] }>({});

  const { genres, period } = useParams<IUrlRouteParams>();

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
        if (period !== 'all') {
          const [start, end] = period!.split('-'); // 221220-221220

          const st = transformDayjsString(start);
          const en = transformDayjsString(end, true);
          const current = dayjs(event.when);

          if (
            !(
              (current.isAfter(st) || current.isSame(st)) &&
              (current.isBefore(en) || current.isSame(en))
            )
          ) {
            return acc;
          }
        }

        let eventArtist = event.artists;
        if (genres !== 'all') {
          const selectedGenres = genres!.split(',').map(Number);

          eventArtist = event.artists.filter((artist) =>
            artist.genres.some((a) => selectedGenres.includes(a.id)),
          );
        }

        eventArtist.forEach((artist) => {
          acc[artist.id] = acc[artist.id] || [];
          acc[artist.id].push(event);
        });

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events, genres, period]);

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });

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
        <section className={b('wrapper')}>
          <div className={b('wrapper', 'cards')}>
            <SliderMobile>
              {Object.keys(eventsByArtist).map((artistId) => (
                <ArtistMobile
                  artistId={+artistId}
                  events={eventsByArtist[artistId]}
                  key={artistId}
                />
              ))}
            </SliderMobile>
          </div>
        </section>
      )}
    </>
  );
};
