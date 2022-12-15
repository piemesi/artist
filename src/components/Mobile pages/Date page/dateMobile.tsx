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

import './dateMobile.scss';

type IProps = React.PropsWithChildren<{
  when: string;
  events: ICard[];
}>;

export const DateMobile = ({ when, events }: IProps) => {
  return (
    <div>
      <h3>{dayjs(when).format('D MMMM')}</h3>
      <TableContainer component={Paper}>
        <Table aria-label='simple table' className={b('table')}>
          <TableBody className={b('table', 'body')}>
            {events.map((row: ICard) => (
              <TableRow className={b('table', 'row')} key={row.id}>
                <TableCell component='th' scope='row'>
                  <h3 className={b('table', 'artist')}>{row.artists[0].title}</h3>
                  <button className={b('table', 'button')}>От 50 €</button>
                </TableCell>
                <TableCell className={b('table', 'time')} align='right'>
                  {dayjs(row.when).format('H:mm')}
                </TableCell>
                <TableCell align='right'>
                  <h3 className={b('table', 'city')}>{row.place.city.title}</h3>
                  <p className={b('table', 'country')}>{row.place.city.country.title}</p>
                  <p>{row.place.title}</p>
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
