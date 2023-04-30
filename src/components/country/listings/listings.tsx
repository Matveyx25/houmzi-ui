import React from 'react';
import s from './listings.module.scss';
import { Block } from '../index';
import Swiper from 'react-id-swiper';
import { IListingCard } from '../../../interfaces/buy/listing-card.interface';
import { ListingCard } from '../listing-card/listing-card';

interface IProps {
  country: string
  listings: IListingCard[]

  getListing(id: string): void

  addFavorite(id: string): void

  removeFavorite(id: string): void
}

export const Listings: React.FC<IProps> = ({ country, listings, ...props }) => (
  <Block title={`The best offers in ${country}`}>
    <Swiper slidesPerView="auto" spaceBetween={20} rebuildOnUpdate>
      {
        listings?.map((listing: IListingCard) => (
          <div key={listing?.id} className={s.listings__card}>
            <ListingCard listing={listing} {...props}/>
          </div>
        ))
      }
    </Swiper>
  </Block>
);
