import React, { useEffect, useState } from 'react';
import b from 'b_';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './search.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { IArtist, IUrlRouteParams, RouterPath } from '../../interfaces';
import {
  getArtistsIdsQuery,
  MAX_SELECTED_OPTIONS,
  useArtistsIDs,
} from '../../shared/artists-ids-hook';

export const Search = () => {
  const navigate = useNavigate();
  const { period, genres, mode, countries, evening } = useParams<IUrlRouteParams>();

  const [options, setOptions] = useState<IArtist[]>([]);
  const [selected, setSelected] = useState<IArtist[]>([]);

  const artIds = useArtistsIDs();

  useEffect(() => {
    fetch('/json/dict.json')
      .then((res) => res.json())
      .then((res) => {
        setOptions(res.artists);
      });
  }, []);

  useEffect(() => {
    if (options.length && artIds) {
      const artists = options.filter((opt) => {
        if (!genres || genres === 'all') {
          return artIds.includes(opt.id);
        }
        const g = genres.split(',').map(Number);
        return artIds.includes(opt.id) && opt.genres.some(({ id }) => g.includes(id));
      });

      setSelected(artists);
    }
  }, [options, artIds, genres]);

  const handleArtistsList = (value: IArtist[]) => {
    let g = genres || 'all';
    if (g !== 'all' && value.length) {
      g = Array.from(
        new Set( //
          value.flatMap(
            (
              artist, //
            ) => artist.genres.map((gen) => gen.id),
          ),
        ),
      ).join(',');
    }

    // `period,countries` will be always all,
    // because an artist can perform in another country and out of the date range.
    const url = `/${RouterPath.ARTISTS}/all/all/${g}/${getArtistsIdsQuery(value.map((v) => v.id))}`;

    navigate(url);
  };

  const handleChange = (event: React.SyntheticEvent, value: IArtist[]) => {
    handleArtistsList(value.slice(0, MAX_SELECTED_OPTIONS));
  };

  const selectedIDs = selected.map(({ id }) => id);

  return (
    <section className={b('search')}>
      {/*<div className={b('search', 'wrapper')}>*/}
      {/*  <SearchIcon className={b('search', 'icon')} />*/}
      {/*  <InputBase*/}
      {/*    placeholder='Артист, город…'*/}
      {/*    inputProps={{ 'aria-label': 'search' }}*/}
      {/*    className={b('search', 'input')}*/}
      {/*    // value={query}*/}
      {/*    onChange={handleChange}*/}
      {/*  />*/}
      {/*</div>*/}

      <Autocomplete
        multiple
        limitTags={2}
        size='small'
        id='multiple-limit-tags'
        options={options}
        getOptionDisabled={(option) =>
          selected.length >= MAX_SELECTED_OPTIONS && !selectedIDs.includes(option.id)
        }
        getOptionLabel={(option: IArtist) => option.title}
        renderInput={(acParams) => (
          <TextField {...acParams} label='Search Artist' placeholder='Artist' />
        )}
        onChange={handleChange}
        value={selected}
      />
    </section>
  );
};
