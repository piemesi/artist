import React, { useEffect, useState } from 'react';
import b from 'b_';
import { DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { RangeValue } from 'rc-picker/es/interface';
import dayjs, { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;

import './date-picker.scss';
import { IUrlRouteParams, RouterPath } from '../../interfaces';

export const DatesPicker = () => {
  const navigate = useNavigate();
  const { genres, mode, countries, evening, search } = useParams<IUrlRouteParams>();

  const [startDate, setStartDate] = React.useState<string | null>('');
  const [endDate, setEndDate] = React.useState<string | null>('');

  const dateFormat = 'DD/MM';
  const handleChange = (dates: RangeValue<Dayjs>, formatString: string[]) => {
    const start = Object.values(dates!)[0]?.format('YYMMDD');
    setStartDate(start!);
    const end = Object.values(dates!)[1]?.format('YYMMDD');
    setEndDate(end!);
    const url = `/${mode || RouterPath.ARTISTS}/${start}-${end}/${countries || 'all'}/${
      genres || 'all'
    }`;
    navigate(url);
  };
  return <RangePicker className={b('input')} onChange={handleChange} format={dateFormat} />;
};
