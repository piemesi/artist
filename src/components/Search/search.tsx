import React from 'react';
import b from 'b_';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import './search.scss';

export const Search = () => {
  return (
    <div className={b('search')}>
      <div className={b('search', 'wrapper')}>
        <SearchIcon className={b('search', 'icon')} />
        <InputBase
          placeholder='Артист, город…'
          inputProps={{ 'aria-label': 'search' }}
          className={b('search', 'input')}
        />
      </div>
    </div>
  );
};
