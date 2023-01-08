import React, { useEffect, useRef, useState } from 'react';
import { CardArtist } from '../../components/CardArtist/card-artist';

import { ICard, ICountry, IDict, IUrlRouteParams } from '../../interfaces';
import { ArtistMobile } from '../../components/MobilePages/ArtistPage/artist-mobile';
import { useMediaQuery } from 'react-responsive';
import b from 'b_';
import Carousel from '../../components/CarouselCards/carousel';
import { SliderMobile } from '../../components/MobilePages/SliderMobile/slider-mobile';

import './artist.scss';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const transformDayjsString = (day: string, isEnd = false): dayjs.Dayjs =>
  dayjs()
    .set('y', Number('20' + day.substring(0, 2)))
    .set('month', Number(day.substring(2, 4)) - 1)
    .set('D', Number(day.substring(4)))
    .set('h', isEnd ? 23 : 0)
    .set('m', isEnd ? 59 : 0)
    .set('s', 0);

export const Artist = () => {
  const [events, setEvents] = useState<ICard[]>([]);
  const [eventsByArtist, setEventsByArtist] = useState<{ [artistId: string]: ICard[] }>({});

  const { genres, period, countries, evening, search } = useParams<IUrlRouteParams>();
  const { id } = useParams();

  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
      });
  }, [id]);
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

        let eventCountries = events;
        let eventArtist = event.artists;

        if (countries !== 'all') {
          const selectedCountries = countries!.split(',').map(Number);
          eventCountries = events.filter((event1) =>
            selectedCountries.includes(event1.city.country.id),
          );

          const artistByCountry = eventCountries.flatMap((card) =>
            card.artists.map((artist) => artist.id),
          );

          eventArtist = event.artists.filter((artist) => artistByCountry.includes(artist.id));
        }

        if (genres !== 'all') {
          const selectedGenres = genres!.split(',').map(Number);

          eventArtist = event.artists.filter((artist) =>
            artist.genres.some((a) => selectedGenres.includes(a.id)),
          );
        }

        // if (evening !== 'all') {
        //   const hour = dayjs(event.when).get('hours');
        //   if (hour < 18) {
        //     return acc;
        //   }
        // }
        //
        // if (search !== 'all') {
        //   const searchWord = search;
        //   const artists = event.artists.filter((artist) =>
        //     artist.title.toLowerCase().includes(searchWord!),
        //   );
        //   const eventsBySearch = events.filter(
        //     (eventCard) =>
        //       eventCard.city.title.toLowerCase().includes(searchWord!) ||
        //       eventCard.city.country.title.toLowerCase().includes(searchWord!),
        //   );
        //   const artistBySearch = eventsBySearch.flatMap((card) =>
        //     card.artists.map((artist) => artist.id),
        //   );
        //   const artistBySearch2 = artists.map((art) => art.id);
        //
        //   eventArtist = event.artists.filter(
        //     (artist) => artistBySearch.includes(artist.id) || artistBySearch2.includes(artist.id),
        //   );
        //   console.log({
        //     artist1: artists,
        //     searchWord,
        //     eventsBySearch,
        //     artistBySearch,
        //     eventArtist,
        //   });
        // }

        eventArtist.forEach((artist) => {
          acc[artist.id] = acc[artist.id] || [];
          acc[artist.id].push(event);
        });

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events, genres, period, countries, evening, search]);

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  return (
    <>
      {isBigScreen ? (
        <section className={b('wrapper')}>
          <div className={b('wrapper', 'cards')} key={id}>
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
