import React from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './go-back-btn.scss';

export const GoBackBtn = () => {
  const navigate = useNavigate();
  return (
    <button className='back-button' onClick={() => navigate(-1)}>
      <KeyboardBackspaceIcon />
      <span>Back</span>
    </button>
  );
};
