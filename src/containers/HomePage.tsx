import { Typography } from "@mui/material";
import { items, cardHeight, bewm } from '../common/common';
import { Chrono } from 'react-chrono';

const HomePage = ()  => {
  return(
    <div className='homePage-container'>
      <div className='timeline'>
        <Chrono
          items={bewm}
          mode='VERTICAL'
          cardHeight={cardHeight}
        />
      </div>
    </div>
  )
}

export default HomePage