import React from 'react';
import { ICard } from '../../../interfaces';
import b from 'b_';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import './events.scss';

export const EventRow = ({ cities, when, ticket, artists, id, place }: ICard) => {
  return (
    // <div className='card__events events'>
    //   <div className={b('events', 'date')}>
    //     <h3 className='events__date'>{dayjs(when).format('D-MMMM')}</h3>
    //     {/*<h3 className='events__date'>{when.format('D-MMMM')}</h3>*/}
    //   </div>
    //   <p className='events__time'>{dayjs(when).format('h:mm A')}</p>
    //   <div className={b('events', 'city')}>
    //     {cities.map((city) => (
    //       <li key={city.id}>{city.title}</li>
    //     ))}
    //   </div>
    // </div>

    <Table aria-label='simple table' className={b('events')}>
      <TableBody>
        <TableRow key={id}>
          <TableCell component='th' scope='row'>
            <h3 className={b('events', 'date')}>{dayjs(when).format('D MMMM')}</h3>
          </TableCell>
          <TableCell className={b('events', 'time')} align='right'>
            {dayjs(when).format('HH:mm')}
          </TableCell>
          <TableCell align='right'>
            <h3 className={b('events', 'city')}>{place.city.title}</h3>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
