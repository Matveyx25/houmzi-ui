import React from 'react';
import s from './listing-list.module.scss';
import { ListingCard } from '../listing-card/listing-card';
import { Sort } from '../sort/sort';
import { IListingCardWithClusterId } from '../../../interfaces/buy/listing-card.interface';

interface IProps {
  listings: IListingCardWithClusterId[]
  count: number

  getListing(id: string): void

  onChangeHoveredId(id: string): void

  addFavorite(id: string): void

  removeFavorite(id: string): void

  setSort(sortField: string | undefined, direction: number | undefined): void

  removeSort(): void
}

export const ListingList: React.FC<IProps> = ({
                                                listings, count, getListing, onChangeHoveredId, addFavorite,
                                                removeFavorite, setSort, removeSort,
                                              }) => (
  <section className={s.list}>
    <h1 className={s.list__title}>
      Rental Listings
    </h1>
    <div className={s.list__info}>
      <div className={s.list__count}>
        {count} {`result${count === 1 ? '' : 's'}`}
      </div>
      <Sort setSort={setSort} removeSort={removeSort}/>
    </div>
    <div className={s.list__scroll}>
      <div className={s.list__wrap}>
        {
          listings.map((listing: IListingCardWithClusterId) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              getListing={getListing}
              onChangeHoveredId={onChangeHoveredId}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          ))
        }
      </div>
    </div>
  </section>
);
