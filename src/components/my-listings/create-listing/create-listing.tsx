import React from 'react';
import { CardWrap } from '../card-wrap/card-wrap';
import s from './create-listing.module.scss';

interface IProps {
  openPopup(): void
}

const CreateListing: React.FC<IProps> = ({ openPopup }) => (
  <CardWrap className={s.card}>
    <button className={s.card__btn} onClick={openPopup}>
      <i className="icon-plus"/>
    </button>
    <div className={s.card__text}>
      Add your listing.
    </div>
  </CardWrap>
);

export default CreateListing;
