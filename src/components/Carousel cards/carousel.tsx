import React, { useEffect, useState } from 'react';
import './carousel.scss';
import arrowLeft from 'icons/big_arrow_left.svg';
import arrowRight from 'icons/big_arrow_right.svg';
import b from 'b_';

const Carousel = (props: any) => {
  const { children, show } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState: any) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState: any) => prevState - 1);
    }
  };

  return (
    // <div className={b('carousel-container')}>
    <div className={b('carousel')}>
      {currentIndex > 0 && (
        <button onClick={prev} className={b('carousel', 'arrow-button')}>
          <img src={arrowLeft} />
        </button>
      )}
      <div className={b('carousel', 'content-wrapper')}>
        <div
          className={`carousel-content show-${show}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / show)}%)`,
          }}
        >
          {children}
        </div>
      </div>
      {currentIndex < length - show && (
        <button onClick={next} className={b('carousel', 'arrow-button')}>
          <img src={arrowRight} />
        </button>
      )}
    </div>
    // </div>
  );
};

export default Carousel;
