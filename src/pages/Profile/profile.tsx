import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IArtist, ICard } from '../../interfaces';
import b from 'b_';
import Avatar from '@mui/material/Avatar';
import favoriteIcon from 'icons/favorite_icon.svg';

import './profile.scss';
import dayjs, { Dayjs } from 'dayjs';
import { GoBackBtn } from '../../shared/go-back-btn';

export const Profile = () => {
  const { id } = useParams();
  const [events, setEvents] = useState<ICard[]>([]);
  const [artist, setArtist] = useState<IArtist | undefined>(undefined);
  const [eventsByArtist, setEventsByArtist] = useState<{ [artistId: string]: ICard[] }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/json/events.json')
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.events);
        console.log({ res });
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
  useEffect(() => {
    setEventsByArtist(
      events.reduce((acc, event: ICard) => {
        const eventArtist = event.artists;

        eventArtist.forEach((artist1) => {
          acc[artist1.id] = acc[artist1.id] || [];
          acc[artist1.id].push(event);
        });

        return acc;
      }, {} as { [day: string]: ICard[] }),
    );
  }, [events]);

  return (
    <>
      <GoBackBtn />
      <section className={b('profile')}>
        {artist && (
          <div className={b('top')}>
            <div className={b('top', 'wrapper')}>
              <Avatar
                alt='name'
                className={b('top', 'avatar')}
                sx={{ width: '100%', height: '100%' }}
                src={artist.main_img}
              ></Avatar>
              <div className={b('top', 'title')}>
                <h2 className={b('top', 'name')}>{artist?.title}</h2>
                <p className={b('top', 'profession')}>{artist?.profession}</p>
                <button className={b('top', 'follow-btn')}>
                  <a>
                    <img src={favoriteIcon} className={b('top', 'favorite')} />
                  </a>
                  <span>Подписаться</span>
                </button>
              </div>
            </div>

            <span className={b('top', 'description')}>
              Lorem ipsum dolor sit amet consectetur. Nam convallis aliquet est massa adipiscing
              viverra. Tortor dui vitae eu feugiat nec nisl. Egestas tristique sollicitudin purus
              nibh. Nullam adipiscing aliquam proin id eget rhoncus fames odio.
            </span>
          </div>
        )}

        <div className={b('bottom')}>
          <span className={b('bottom', 'title')}>{`${artist?.title} - концерты`}</span>
          <div key={id} className={b('bottom', 'content')}>
            {eventsByArtist[id!] &&
              eventsByArtist[id!].map((card) => (
                <div key={card.id}>
                  <hr className={b('bottom', 'break')} />

                  <div className={b('bottom', 'row')}>
                    <div className={b('bottom', 'left-wrapper')}>
                      <div className={b('bottom', 'date')}>
                        <p className={b('date', 'day')}>{dayjs(card.when).format('DD')}</p>
                        <div>
                          <p className={b('date', 'week-day')}>{dayjs(card.when).format('dddd')}</p>
                          <p className={b('date', 'month')}>{dayjs(card.when).format('MMMM')}</p>
                        </div>
                      </div>
                      <div className={b('bottom', 'place')}>
                        <h3 className={b('bottom', 'city')}>{card.place.city.title}</h3>
                        <h3 className={b('bottom', 'location')}>{card.place.title}</h3>
                      </div>
                    </div>
                    <button className={b('bottom', 'button')}>Купить билет</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
