import * as React from 'react';
import b from 'b_';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import './switch-label.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { IUrlRouteParams, RouterPath } from '../../interfaces';
import { RangeValue } from 'rc-picker/es/interface';
import { Dayjs } from 'dayjs';

export const SwitchLabel = () => {
  const navigate = useNavigate();
  const { period, genres, mode, countries, evening, search } = useParams<IUrlRouteParams>();

  const [isActive, setIsActive] = useState('evening');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toggle = isActive !== 'evening' ? setIsActive('evening') : setIsActive('all');

    // const url = `/${mode || RouterPath.ARTISTS}/${period || 'all'}/${countries || 'all'}/${
    //   genres || 'all'
    // }/${isActive}/${search || 'all'}`;
    // navigate(url);
  };

  return (
    <FormGroup className={b('switch')}>
      <FormControlLabel control={<Switch onChange={handleChange} />} label='Вечер' />
    </FormGroup>
  );
};
