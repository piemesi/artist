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
import Input from '@mui/material/Input';

import './filters.scss';
import { RouterPath } from '../../interfaces';

const countriesList = [
  {
    id: '1',
    title: 'Netherlands',
  },
  {
    id: '2',
    title: 'Poland',
  },
];

/**
 * @TODO: don't confuse a user - if he tries to unselect all the genres -> probably the output should be emoty with message: "Please select at least one genre"
 */

export const Locations = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  const [location, setLocation] = React.useState<string[]>([]);

  useEffect(() => {
    const { countries } = params;
    if (!countries) return;

    if (countries === 'all') {
      setLocation(countriesList.map(({ id }) => String(id)));
    } else {
      setLocation(countries.split(','));
    }
  }, [params]);

  const handleChange = (event: SelectChangeEvent<typeof location>) => {
    const {
      target: { value },
    } = event;

    const selected = typeof value === 'string' ? value.split(',') : value;
    const url = `/${RouterPath.ARTISTS}/${params.period}/${
      selected.length === countriesList.length || !selected.length ? 'all' : selected.join(',')
    }/${params.genres}`;

    navigate(url);
  };

  return (
    <Select
      labelId='demo-multiple-chip-label'
      id='demo-multiple-chip'
      multiple
      value={location}
      onChange={handleChange}
      input={<Input />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value}
              label={countriesList.find((item) => item.id === value)?.title || ''}
            />
          ))}
        </Box>
      )}
    >
      {countriesList.map(({ id, title }) => (
        <MenuItem key={id} value={id}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};
