import React, { useEffect, useState } from 'react';
import './slider-mobile.scss';
import arrowLeft from 'icons/arrow_left.svg';
import arrowRight from 'icons/arrow_right.svg';
import b from 'b_';

export const SliderMobile = (props: any) => {
  const { children } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState: number) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState: number) => prevState - 1);
    }
  };

  return (
    <div className={b('slider')}>
      {currentIndex > 0 && (
        <button onClick={prev} className={b('slider', 'arrow-button', { left: true })}>
          <img src={arrowLeft} />
        </button>
      )}
      <div className={b('slider', 'wrapper')}>
        <div
          className={`slider-content show-${1}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / 1)}%)`,
          }}
        >
          {children}
        </div>
      </div>
      {currentIndex < length - 1 && (
        <button onClick={next} className={b('slider', 'arrow-button', { right: true })}>
          <img src={arrowRight} />
        </button>
      )}
    </div>
  );
};
