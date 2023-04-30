import React, { useContext } from 'react';
import s from './listings.module.scss';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { ListingCard } from '../listing-card/listing-card';
import { listings } from '../../../mocks/not-found/listings.data';
import { IListing } from '../../../interfaces/not-found/listing.interface';
import { LayoutContext } from '../../../contexts/layout.context';

const swiperConfig: ReactIdSwiperProps = {
  slidesPerView: 'auto',
  spaceBetween: 20,
};

export const Listings: React.FC = () => {
  const { windowWidth } = useContext(LayoutContext);

  return (
    <div className={s.listings}>
      {
        windowWidth >= 1240
          ? <div className={s.listings__wrap}>
            {
              listings.slice(0, 2).map((listing: IListing) => (
                <ListingCard key={listing?.id} listing={listing}/>
              ))
            }
          </div>
          : <Swiper {...swiperConfig}>
            {
              listings.map((listing: IListing) => (
                <div key={listing?.id} className={s.listings__card}>
                  <ListingCard listing={listing}/>
                </div>
              ))
            }
          </Swiper>
      }
    </div>
  );
};
