import React from 'react';
import s from './reporting-popup.module.scss';
import { Button } from '../../shared/button/button';

interface IProps {
  closePopup(): void
}

export const ReportingPopup: React.FC<IProps> = ({ closePopup }) => (
  <div className={s.wrap}>
    <p className={s.text}>
      You help to make our service even better and more convenient.
    </p>
    <Button color="blue" className={s.btn} onClick={closePopup}>
      Close
    </Button>
  </div>
);
