import * as React from 'react';
import b from 'b_';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import './switch-label.scss';

export const SwitchLabel = () => {
  return (
    <FormGroup className={b('switch')}>
      <FormControlLabel control={<Switch defaultChecked />} label='Вечер' />
    </FormGroup>
  );
};
