import { Dayjs } from 'dayjs';

export interface ICard {
  id: number;
  artists: IArtist[];
  when: Dayjs;
  place: IPlace;
  cities: ICity[];
  ticket: ITicket;
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
  genres: IGenre[];
}

export interface ITicket {
  web_link: string;
  title: string;
  price_from: number;
  currency: {
    id: number;
    title: string;
  };
}

export interface IPlace {
  id: number;
  title: string;
  address: string;
  lat: number;
  lng: number;
  city: ICity;
}

export interface ICountry {
  id: number;
  title: string;
  cities: ICity[];
}

export interface ICity {
  id: number;
  title: string;
  country: {
    id: number;
    title: string;
  };
}

export interface IGenre {
  id: number;
  title: string;
}

export enum RouterPath {
  ARTISTS = 'artists',
  DATES = 'dates',
}

interface IUrlRoute {
  mode: RouterPath;
  genres: 'all' | string;
  period: 'all' | string;
  countries: 'all' | string;
}

export interface IDict {
  countries: ICountry[];
  genres: IGenre[];
  artists: IArtist[];
}

export type IUrlRouteParams = keyof IUrlRoute;
