import React from 'react';
import s from './listing-card.module.scss';
import { IListing } from '../../../interfaces/not-found/listing.interface';

interface IProps {
  listing: IListing
}

export const ListingCard: React.FC<IProps> = ({ listing }) => (
  <div className={s.card}>
    <img
      src="https://klike.net/uploads/posts/2020-01/1579858769_1.jpg"
      alt=""
      className={s.card__img}
    />
    <div className={s.card__row}>
      <div className={s.card__price}>
        $850
        <span className={s.card__postfix}>/mo</span>
      </div>
      <div className={s.card__date}>
        3 days ago
      </div>
    </div>
    <div className={s.card__address}>
      105 E 14th Street, Hastings, NE
    </div>
    <div className={s.card__heart}>
      {
        listing?.isSaved
          ? <i className="icon-heart-line"/>
          : <i className="icon-heart-full"/>
      }
    </div>
  </div>
);
