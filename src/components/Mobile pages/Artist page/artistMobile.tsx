import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ICard } from '../../../interfaces';
import b from 'b_';
import './artistMobile.scss';
import { Slider } from '../Slider/slider';
import dayjs from 'dayjs';

function createData(date: string, time: string, place: string) {
  return { date, time, place };
}

const rows = [
  createData('02 декабря', '18:00', 'Амстердам'),
  createData('03 декабря', '19:00', 'Гаага'),
  createData('04 декабря', '20:00', 'Эйндховен'),
  createData('05 декабря', '18:30', 'Утрехт'),
  createData('06 декабря', '18:00', 'Амстердам'),
];

export const ArtistMobile = (events: any) => {
  return (
    <>
      <Slider artists={events.events.map((card: ICard) => card.artists[0])} />
      <TableContainer component={Paper}>
        <Table aria-label='simple table' className={b('table')}>
          <TableBody className={b('table', 'body')}>
            {events.events.map((row: ICard) => (
              <TableRow className={b('table', 'row')} key={row.id}>
                <TableCell component='th' scope='row'>
                  <h3 className={b('table', 'date')}>{dayjs(row.when).format('D MMMM')}</h3>
                  <button className={b('table', 'button')}>On 50 €</button>
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
      <button className={b('button-follow')}>Follow the Artist</button>
    </>
  );
};
