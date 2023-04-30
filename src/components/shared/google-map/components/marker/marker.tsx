import React from 'react';
import s from './marker.module.scss';
import c from 'classnames/bind';
import { IListingCard } from '../../../../../interfaces/buy/listing-card.interface';
import ListingCard from '../listing-card/listing-card';

interface IProps {
  lat: number
  lng: number
  listing: IListingCard
  hovered: boolean

  getListing(id: string): void
}

export const Marker: React.FC<IProps> = ({ listing, hovered, getListing }) => (
  <div className={c(s.marker, hovered && s.hovered, listing.actionType === 'Sell' ? s.marker_sell : s.marker_rent)}>
    <ListingCard listing={listing} getListing={getListing}/>
  </div>
);
