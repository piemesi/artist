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
import { ROUTER_PATHS } from '../../routes';
import { DatesPicker } from '../Date Picker/datePicker';

import './filters.scss';

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
  const theme = useTheme();
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
    const url = `/${ROUTER_PATHS.ARTISTS}/${
      selected.length === genresList.length || !selected.length ? 'all' : selected.join(',')
    }`;

    navigate(url);
  };

  return (
    <section className={b('filters')}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-chip-label'>Жанр</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={genresList.find((item) => item.id === value)?.title || ''}
                />
              ))}
            </Box>
          )}
          // MenuProps={MenuProps}
        >
          {genresList.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*<DatesPicker />*/}
    </section>
  );
};
