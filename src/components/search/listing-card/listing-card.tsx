import React from 'react';
import s from './listing-card.module.scss';
import { IListing } from '../../../interfaces/not-found/listing.interface';

interface IProps {
  listing?: IListing
}

class ListingCard extends React.Component<IProps> {
  render(): React.ReactElement {
    const { listing } = this.props;

    return (
      <div className={s.card}>
        <img
          src="https://www.gwd.ru/upload/resize_cache/iblock/d79/300_200_1/d798f3a72cca1a5dbcb48a8462203422.png"
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
  }
}

export default ListingCard;
