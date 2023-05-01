import React from 'react';
import s from './cluster.module.scss';
import c from 'classnames';
import { IListingCard } from '../../../../../interfaces/buy/listing-card.interface';
import ListingCard from '../listing-card/listing-card';

interface IProps {
  map: google.maps.Map
  lat: number
  lng: number
  listings: IListingCard[]
  numPoints: number
  hovered: boolean

  getListing(id: string): void
}

export const Cluster: React.FC<IProps> = ({ map, listings, numPoints, hovered, getListing }) => {
  const disable = () => {
    map.setOptions({ draggable: false, scrollwheel: false });
  };

  const enable = () => {
    map.setOptions({ draggable: true, scrollwheel: true });
  };

  return (
    <div
      className={c(s.cluster, hovered && s.hovered)}
      onMouseOver={disable}
      onMouseOut={enable}
    >
      {numPoints}
      <div className={s.listings}>
        <div className={s.listings__wrap}>
          <div className={s.listings__scroll}>
            {
              listings.map((listing: IListingCard) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  cluster
                  getListing={getListing}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

