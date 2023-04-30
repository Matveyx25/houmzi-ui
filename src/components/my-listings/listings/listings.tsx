import React from 'react';
import s from './listings.module.scss';
import { IListingCard } from '../../../interfaces/my-listings/listing-card.interface';
import CreateListingContainer from '../../../containers/my-listings/create-listing-container';
import Card from '../card/card';

interface IProps {
  listings: IListingCard[]
  draft?: boolean

  deleteListing(id: string): void

  publishListing(id: string): void
}

export const Listings: React.FC<IProps> = ({ listings, ...props }) => (
  <div className={s.scroll}>
    <div className={s.content}>
      <CreateListingContainer/>
      {
        listings.map((listing: IListingCard) => (
          <Card key={listing?.id} listing={listing} {...props}/>
        ))
      }
    </div>
  </div>
);
