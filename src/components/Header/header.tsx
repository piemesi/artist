import React, { useState } from 'react';
import b from 'b_';

import { Mode } from 'components/Mode/mode';
import { Search } from 'components/Search/search';
import { SwitchLabel } from '../SwitchLabels/switch-label';
import './header.scss';

export const Header = () => {
  return (
    <section className={b('header')}>
      <div className={b('header', 'wrapper')}>
        <Search />
        <Mode />
        <SwitchLabel />
      </div>
    </section>
  );
};
