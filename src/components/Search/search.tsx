import React, { useEffect, useState } from 'react';
import b from 'b_';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import './search.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { IUrlRouteParams, RouterPath } from '../../interfaces';

export const Search = () => {
  const navigate = useNavigate();
  const { period, genres, mode, countries, evening } = useParams<IUrlRouteParams>();
  const params = useParams();

  const [query, setQuery] = useState('all');
  console.log(query);
  // useEffect(() => {
  //   const { search } = params;
  //   if (!search) return;
  //   setQuery(search);
  // }, [params]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const url = `/${mode || RouterPath.ARTISTS}/${period || 'all'}/${countries || 'all'}/${
      genres || 'all'
    }/${evening || 'all'}/${query}`;
    navigate(url);
  };
  // setQuery(event.target.value);
  // const url = `/${mode || RouterPath.ARTISTS}/${period || 'all'}/${countries || 'all'}/${
  //   genres || 'all'
  // }/${evening || 'all'}/${query}`;
  // navigate(url);
  // };
  return (
    <div className={b('search')}>
      <div className={b('search', 'wrapper')}>
        <SearchIcon className={b('search', 'icon')} />
        <InputBase
          placeholder='Артист, город…'
          inputProps={{ 'aria-label': 'search' }}
          className={b('search', 'input')}
          // value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
