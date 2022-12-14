import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IArtist, ICard } from '../../../interfaces';
import b from 'b_';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import './artist-mobile.scss';

type IProps = React.PropsWithChildren<{
  artistId: number;
  events: ICard[];
}>;
export const ArtistMobile = ({ artistId, events }: IProps) => {
  const artist: IArtist = events[0].artists.find(({ id }) => id === artistId)!;

  return (
    <div>
      <div className={b('wrapper-avatar')}>
        <Avatar alt='current' src={artist.main_img} className={b('wrapper-avatar', 'img')} />
        <span className={b('wrapper-avatar', 'title')}>{artist.title}</span>
      </div>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }} key={artist.id}>
        <Table aria-label='simple table' className={b('table')}>
          <TableBody className={b('table', 'body')}>
            {events.map((row: ICard) => (
              <TableRow className={b('table', 'row')} key={row.id}>
                <TableCell component='th' scope='row'>
                  <h3 className={b('table', 'date')}>{dayjs(row.when).format('D MMMM')}</h3>
                  <button className={b('table', 'button')}>On 50 €</button>
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
      <button className={b('button-follow')}>Follow the Artist</button>
    </div>
  );
};
