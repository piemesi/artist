import React, { useEffect, useState } from 'react';
import b from 'b_';
import { DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { RangeValue } from 'rc-picker/es/interface';
import { Dayjs } from 'dayjs';
import { ROUTER_PATHS } from '../../routes';
const { RangePicker } = DatePicker;

import './datePicker.scss';

export const DatesPicker = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [startDate, setStartDate] = React.useState<string | null>('');
  const [endDate, setEndDate] = React.useState<string | null>('');

  useEffect(() => {
    const { dates } = params;
    if (!dates) return;

    if (dates !== null) {
      // const start = Object.values(dates!)[0]?.format('M-D');
      setStartDate(dates);
      // const end = Object.values(dates!)[1]?.format('M-D');
      // setEndDate(dates[1]);
    }
  }, [params]);

  const handleChange = (dates: RangeValue<Dayjs>, formatString: string[]) => {
    const start = Object.values(dates!)[0]?.format('M-D');
    setStartDate(start!);
    const end = Object.values(dates!)[1]?.format('M-D');
    setEndDate(end!);
    const url = `/${ROUTER_PATHS.ARTISTS}/${start}/${end}`;
    navigate(url);
  };

  return <RangePicker className={b('input')} onChange={handleChange} />;
};
