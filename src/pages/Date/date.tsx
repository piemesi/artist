import React, { useEffect, useState } from 'react';
import { CardDate } from '../../components/Card Date/cardDate';
import { ICard } from '../../interfaces';
import { DateMobile } from '../../components/Mobile pages/Date page/dateMobile';
import { useMediaQuery } from 'react-responsive';
import Carousel from '../../components/Carousel cards/carousel';
import dayjs from 'dayjs';

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

  console.log({ eventsByDay });

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });

  return (
    <>
      {isBigScreen ? (
        <div className='cards'>
          <Carousel show={4}>
            {Object.keys(eventsByDay).map((day) => (
              <CardDate when={day} events={eventsByDay[day]} key={day} />
            ))}
          </Carousel>
        </div>
      ) : (
        <DateMobile events={events} />
      )}
    </>
    // <div className='cards'>
    //   {/*{dict.map((card: ICard) => (*/}
    //   {/*  <CardDate key={card.id} {...card} />*/}
    //   {/*))}*/}
    //
    // </div>
  );
};
