import { Dayjs } from 'dayjs';

export interface ICard {
  id: number;
  artists: IArtist[];
  when: Dayjs;
  place: {
    id: number;
    title: string;
    address: string;
    lat: number;
    lng: number;
    city: {
      id: number;
      title: string;
      country: {
        id: number;
        title: string;
      };
    };
  };
  cities: [
    {
      id: number;
      title: string;
    },
  ];
  ticket: {
    web_link: string;
    title: string;
    price_from: number;
    currency: {
      id: number;
      title: string;
    };
  };
}

export interface IArtist {
  id: number;
  title: string;
  main_img: string;
  avatar_img: string;
  yt_link: string | null;
  fb_link: string | null;
  ig_link: string | null;
  web_link: string | null;
  description: string | null;
  profession: string;
  genres: [
    {
      id: number;
      title: string;
    },
  ];
}
