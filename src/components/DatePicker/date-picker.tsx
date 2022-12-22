import React, { useEffect, useState } from 'react';
import b from 'b_';
import { DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { RangeValue } from 'rc-picker/es/interface';
import { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;

import './date-picker.scss';
import { IUrlRouteParams, RouterPath } from '../../interfaces';

export const DatesPicker = () => {
  const navigate = useNavigate();
  const { period, genres, mode, countries } = useParams<IUrlRouteParams>();

  const [startDate, setStartDate] = React.useState<string | null>('');
  const [endDate, setEndDate] = React.useState<string | null>('');

  // useEffect(() => {
  //   const { dates } = params;
  //   if (!dates) return;
  //
  //   if (dates !== null) {
  //     // const start = Object.values(dates!)[0]?.format('M-D');
  //     setStartDate(dates);
  //     // const end = Object.values(dates!)[1]?.format('M-D');
  //     // setEndDate(dates[1]);
  //   }
  // }, [params]);

  console.log('DP', { period, genres, countries });

  const handleChange = (dates: RangeValue<Dayjs>, formatString: string[]) => {
    const start = Object.values(dates!)[0]?.format('YYMD');
    setStartDate(start!);
    const end = Object.values(dates!)[1]?.format('YYMD');
    setEndDate(end!);
    const url = `/${mode || RouterPath.ARTISTS}/${start}-${end}/${countries || 'all'}/${
      genres || 'all'
    }`;
    navigate(url);
  };

  return <RangePicker className={b('input')} onChange={handleChange} />;
};
