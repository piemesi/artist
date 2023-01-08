import React, { useEffect, useState } from 'react';
import b from 'b_';
import { DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { RangeValue } from 'rc-picker/es/interface';
import { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;

import './date-picker.scss';
import { IUrlRouteParams, RouterPath } from '../../interfaces';
import { transformDayjsString } from '../../pages/Date/date';
import { getArtistsIdsQuery, useArtistsIDs } from '../../shared/artists-ids-hook';

export const DatesPicker = () => {
  const navigate = useNavigate();
  const { genres, mode, countries, period } = useParams<IUrlRouteParams>();

  const artistsIds = useArtistsIDs();
  const [dateRange, setDateRange] = React.useState<[Dayjs, Dayjs] | null>(null);

  const dateFormat = 'DD/MM';
  const handleChange = (dates: RangeValue<Dayjs>, formatString: string[]) => {
    const start = Object.values(dates!)[0]?.format('YYMMDD');
    const end = Object.values(dates!)[1]?.format('YYMMDD');
    const url = `/${mode || RouterPath.ARTISTS}/${start}-${end}/${countries || 'all'}/${
      genres || 'all'
    }/${getArtistsIdsQuery(artistsIds)}`;
    navigate(url);
  };

  useEffect(() => {
    if (period && period !== 'all') {
      const [start, end] = period!.split('-'); // 221220-221220

      const st = transformDayjsString(start);
      const en = transformDayjsString(end, true);

      setDateRange([st, en]);
    } else {
      setDateRange(null);
    }
  }, [period]);

  return (
    <RangePicker
      className={b('input')}
      onChange={handleChange}
      format={dateFormat}
      value={dateRange}
    />
  );
};
