import React, { useState } from 'react';
import b from 'b_';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import arrowLeft from 'icons/arrow_left.svg';
import arrowRight from 'icons/arrow_right.svg';
import { IArtist } from '../../../interfaces';

import './slider.scss';

export const Slider = (artists: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const artistsAvatars = artists.artists.map((artist: IArtist) => {
    return artist.main_img;
  });

  const artistsNames = artists.artists.map((artist: IArtist) => {
    return artist.title;
  });

  const goToPrev = () => {
    const isFirstImg = currentIndex === 0;
    const newIndex = isFirstImg ? artistsAvatars.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImg = currentIndex === artistsAvatars.length - 1;
    const newIndex = isLastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className={b('slider')}>
      <IconButton className={b('slider', 'arrow', { left: true })} onClick={goToPrev}>
        <label className={b('slider', 'arrow', { label: true })}>
          {artistsNames[currentIndex - 1]}
        </label>
        <img src={arrowLeft} />
      </IconButton>
      <Stack direction='column' spacing={2} alignItems='center'>
        <Avatar alt='current' src={artistsAvatars[currentIndex]} />
        <span>{artistsNames[currentIndex]}</span>
      </Stack>
      <IconButton className={b('slider', 'arrow', { right: true })} onClick={goToNext}>
        <label className={b('slider', 'arrow', { label: true })}>
          {artistsNames[currentIndex + 1]}
        </label>
        <img src={arrowRight} />
      </IconButton>
    </section>
  );
};
