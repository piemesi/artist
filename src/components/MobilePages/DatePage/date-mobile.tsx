import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ICard } from '../../../interfaces';
import b from 'b_';
import dayjs from 'dayjs';

import './date-mobile.scss';

type IProps = React.PropsWithChildren<{
  when: string;
  events: ICard[];
}>;

export const DateMobile = ({ when, events }: IProps) => {
  return (
    <div className={b('wrapper')}>
      <h3 className={b('wrapper', 'current-date')}>{dayjs(when).format('D MMM')}</h3>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table aria-label='simple table' className={b('table')}>
          <TableBody className={b('table', 'body')}>
            {events.map((row: ICard) => (
              <TableRow className={b('table', 'row')} key={row.id}>
                <TableCell component='th' scope='row'>
                  <p className={b('table', 'artist')}>{row.artists[0].title}</p>
                  <button className={b('table', 'button')}>От 50 €</button>
                </TableCell>
                <TableCell className={b('table', 'time')}>
                  {dayjs(row.when).format('H:mm')}
                </TableCell>
                <TableCell align='right'>
                  <h3 className={b('table', 'city')}>{row.place.city.title}</h3>
                  <p className={b('table', 'country')}>{row.place.city.country.title}</p>
                  <p className={b('table', 'place')}>{row.place.title}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button className={b('button-follow')}>Subscribe to the Updates by Filter</button>
    </div>
  );
};
