import React from 'react';
import s from './delete-listing.module.scss';
import { IListingCard } from '../../../interfaces/my-listings/listing-card.interface';
import { Button } from '../../shared/button/button';

interface IProps {
  listing: IListingCard

  deleteListing(id: string): void

  closePopup(): void
}

export const DeleteListing: React.FC<IProps> = ({ listing, deleteListing, closePopup }) => {
  const onDeleteListing = () => {
    deleteListing(listing?.id);
    closePopup();
  };

  return (
    <div className={s.delete}>
      <div className={s.delete__desc}>
        You cannot restore deleted listing
      </div>
      <div className={s.card}>
        <div className={s.card__imgWrap}>
          {
            listing?.avatar
              ? <img src={listing?.avatar} alt="" className={s.card__img}/>
              : <img className={s.card__imgNo} src="/images/gallery.svg" alt=""/>
          }
        </div>
        <div className={s.card__address}>
          {listing?.address}
        </div>
        <div className={s.card__price}>
          {
            listing?.price
              ? <>
                  <span>
                    ${listing?.price.toLocaleString()}
                  </span>
                /mo
              </>
              : 'No price'
          }
        </div>
      </div>
      <Button color="orange" onClick={onDeleteListing}>
        Delete
      </Button>
    </div>
  );
};
