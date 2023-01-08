import React, { useEffect, useState } from 'react';
import { CardDate } from '../../components/CardDate/card-date';
import { ICard, IUrlRouteParams } from '../../interfaces';
import { DateMobile } from '../../components/MobilePages/DatePage/date-mobile';
import { useMediaQuery } from 'react-responsive';
import Carousel from '../../components/CarouselCards/carousel';
import dayjs from 'dayjs';
import b from 'b_';
import { SliderMobile } from '../../components/MobilePages/SliderMobile/slider-mobile';
import { useParams } from 'react-router-dom';

export const transformDayjsString = (day: string, isEnd = false): dayjs.Dayjs =>
  dayjs()
    .set('y', Number('20' + day.substring(0, 2)))
    .set('month', Number(day.substring(2, 4)) - 1)
    .set('D', Number(day.substring(4)))
    .set('h', isEnd ? 23 : 0)
    .set('m', isEnd ? 59 : 0)
    .set('s', 0);

export const Date = () => {
  const [events, setEvents] = useState<ICard[]>([]);
  const [eventsByDay, setEventsByDay] = useState<{ [day: string]: ICard[] }>({});
  const { genres, period, countries, evening } = useParams<IUrlRouteParams>();

  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
      });
  }, []);

  useEffect(() => {
    setEventsByDay(
      events.reduce((acc, event) => {
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

        if (countries !== 'all') {
          const selectedCountries = countries!.split(',').map(Number);
          if (!selectedCountries.includes(event.city.country.id)) {
            return acc;
          }
        }

        if (genres !== 'all') {
          const selectedGenres = genres!.split(',').map(Number);
          if (
            !event.artists.some((artist) =>
              artist.genres.some((a) => selectedGenres.includes(a.id)),
            )
          ) {
            return acc;
          }
        }

        // if (evening !== 'all') {
        //   const hour = dayjs(event.when).get('hours');
        //   if (hour < 18) {
        //     return acc;
        //   }
        // }

        const day = dayjs(event.when).format('YYYY-MM-DD');
        acc[day] = acc[day] || [];
        acc[day].push(event);

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events, period, genres, evening, countries]);

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });

  return (
    <>
      {isBigScreen ? (
        <section className={b('wrapper')}>
          <div className={b('wrapper', 'cards')}>
            <Carousel show={4}>
              {Object.keys(eventsByDay).map((day) => (
                <CardDate when={day} events={eventsByDay[day]} key={day} />
              ))}
            </Carousel>
          </div>
        </section>
      ) : (
        <section className={b('wrapper')}>
          <div className={b('wrapper', 'cards')}>
            <SliderMobile>
              {Object.keys(eventsByDay).map((day) => (
                <DateMobile when={day} events={eventsByDay[day]} key={day} />
              ))}
            </SliderMobile>
          </div>
        </section>
      )}
    </>
  );
};
