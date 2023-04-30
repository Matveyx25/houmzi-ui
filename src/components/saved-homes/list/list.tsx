import React from 'react';
import s from './list.module.scss';
import { ListingCard } from '../../homes/listing-card/listing-card';
import { IListingCardWithClusterId } from '../../../interfaces/buy/listing-card.interface';

interface IProps {
  listings: IListingCardWithClusterId[]

  getListing?(id: string): void

  onChangeHoveredId?(id: string): void

  addFavorite?(id: string): void

  removeFavorite?(id: string): void
}

export const List: React.FC<IProps> = ({ listings, ...props }) => (
  <div className={s.list__wrap}>
    <h2 className={s.list__title}>
      {listings.length} saved home{listings.length === 1 ? '' : 's'}
    </h2>
    <div className={s.list__scrollWrap}>
      <div className={s.list__scroll}>
        <div className={s.list}>
          {
            listings?.map((listing: IListingCardWithClusterId) => (
              <ListingCard key={listing.id} listing={listing}{...props}/>
            ))
          }
        </div>
      </div>
    </div>
  </div>
);
