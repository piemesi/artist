import TableBody from '@mui/material/TableBody';
import b from 'b_';
import { ICard } from '../../interfaces';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import * as React from 'react';
import Table from '@mui/material/Table';

type IProps = React.PropsWithChildren<{
  events: ICard[];
  isDatePage?: boolean;
}>;

export const MobileTable = ({
  events,
  isDatePage = false,
}: IProps): React.ReactElement<typeof Table> => {
  return (
    <TableBody className={b('table', 'body')}>
      {events.map((row: ICard) => (
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
  );
};
