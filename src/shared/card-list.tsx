import b from 'b_';
import TableBody from '@mui/material/TableBody';
import { ICard } from '../interfaces';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import React from 'react';
import { Link } from 'react-router-dom';

type IProps = React.PropsWithChildren<{
  events: ICard[];
  isDatePage?: boolean;
}>;

export const CardList = ({
  events,
  isDatePage = false,
}: IProps): React.ReactElement<typeof Table> => (
  <Table aria-label='simple table' className={b('events')}>
    <TableBody>
      {events.map((row: ICard) => (
        <TableRow key={row.id}>
          <TableCell
            scope='row'
            sx={{ border: 0, py: '0.2rem', px: '1rem' }}
            className={b('events', 'date')}
          >
            <h3>
              {isDatePage ? (
                <Link to={`/profile/${row.artists[0].id}`} className={b('card', 'profile-link')}>
                  {row.artists[0].title}
                </Link>
              ) : (
                dayjs(row.when).format('D MMMM')
              )}
            </h3>
          </TableCell>
          <TableCell
            sx={{ border: 0, py: '0.2rem', px: '1rem' }}
            className={b('events', 'time')}
            align='right'
          >
            {dayjs(row.when).format('HH:mm')}
          </TableCell>
          <TableCell sx={{ border: 0, py: '0.2rem', px: '1rem' }} align='right'>
            <h3 className={b('events', 'city')}>{row.place.city.title}</h3>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
