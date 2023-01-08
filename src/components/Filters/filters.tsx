import React, { useEffect } from 'react';
import b from 'b_';
import { useNavigate, useParams } from 'react-router-dom';

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { DatesPicker } from '../DatePicker/date-picker';

import './filters.scss';
import { RouterPath } from '../../interfaces';
import { Locations } from './locations';
import Input from '@mui/material/Input';

const genresList = [
  {
    id: '1',
    title: 'StandUp',
  },
  {
    id: '2',
    title: 'Music',
  },
];

/**
 * @TODO: don't confuse a user - if he tries to unselect all the genres -> probably the output should be emoty with message: "Please select at least one genre"
 */

export const Filters = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  const [personName, setPersonName] = React.useState<string[]>([]);

  useEffect(() => {
    const { genres } = params;
    if (!genres) return;

    if (genres === 'all') {
      setPersonName(genresList.map(({ id }) => String(id)));
    } else {
      setPersonName(genres.split(','));
    }
  }, [params]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    const selected = typeof value === 'string' ? value.split(',') : value;
    const url = `/${params.mode || RouterPath.ARTISTS}/${params.period}/${
      params.countries || 'all'
    }/${selected.length === genresList.length || !selected.length ? 'all' : selected.join(',')}`;

    navigate(url);
  };

  return (
    <section className={b('filters')}>
      <div className={b('filters', 'wrapper')}>
        <DatesPicker />
        <Locations />
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={genresList.find((item) => item.id === value)?.title || ''}
                />
              ))}
            </div>
          )}
        >
          {genresList.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </div>
    </section>
  );
};
