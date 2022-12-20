import React, { useEffect, useState } from 'react';
import { CardDate } from '../../components/CardDate/card-date';
import { ICard } from '../../interfaces';
import { DateMobile } from '../../components/MobilePages/DatePage/date-mobile';
import { useMediaQuery } from 'react-responsive';
import Carousel from '../../components/CarouselCards/carousel';
import dayjs from 'dayjs';
import b from 'b_';
import { SliderMobile } from '../../components/MobilePages/SliderMobile/slider-mobile';

export const Date = () => {
  const [events, setEvents] = useState<ICard[]>([]);
  const [eventsByDay, setEventsByDay] = useState<{ [day: string]: ICard[] }>({});

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
        const day = dayjs(event.when).format('YYYY-MM-DD');
        acc[day] = acc[day] || [];
        acc[day].push(event);

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events]);

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
