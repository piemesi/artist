import React, { useState } from 'react';
import b from 'b_';

import IconButton from '@mui/material/IconButton';
import arrowLeft from 'icons/arrow_left.svg';
import arrowRight from 'icons/arrow_right.svg';
import { ICard } from '../../../interfaces';

import './slider.scss';
import dayjs, { Dayjs } from 'dayjs';

export const SliderDate = (events: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dates = events.events.events.map((card: ICard) => {
    return dayjs(card.when).format('D MMMM');
  });

  const goToPrev = () => {
    const isFirstImg = currentIndex === 0;
    const newIndex = isFirstImg ? dates.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImg = currentIndex === dates.length - 1;
    const newIndex = isLastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const currentDate = dayjs().format('D MMMM');

  return (
    <section className={b('slider')}>
      <IconButton className={b('slider', 'arrow', { left: true })} onClick={goToPrev}>
        <label className={b('slider', 'arrow', { label: true })}>{dates[currentIndex - 1]}</label>
        <img src={arrowLeft} />
      </IconButton>
      <span>{dates[currentIndex]}</span>
      <IconButton className={b('slider', 'arrow', { right: true })} onClick={goToNext}>
        <label className={b('slider', 'arrow', { label: true })}>{dates[currentIndex + 1]}</label>
        <img src={arrowRight} />
      </IconButton>
    </section>
  );
};
