import React from 'react';
import s from './listing-card.module.scss';
import Link from 'next/link';
import { stringToUrl } from '../../../helpers/url-parser.helper';
import Moment from 'react-moment';
import { IListingCard } from '../../../interfaces/buy/listing-card.interface';

interface IProps {
  listing: IListingCard

  getListing(id: string): void

  addFavorite(id: string): void

  removeFavorite(id: string): void
}

export const ListingCard: React.FC<IProps> = ({ listing, getListing, addFavorite, removeFavorite }) => {
  const onChangeFavorite = () => {
    if (listing.isFavorite) {
      removeFavorite(listing.id);
    } else {
      addFavorite(listing.id);
    }
  };

  return (
    <div className={s.card__container}>
      <div className={s.card} onClick={() => getListing && getListing(listing.id)}>
        <Link
          href={`/homes?listingAddress=${listing.address}&listingId=${listing.id}`}
          as={`/homedetails/${stringToUrl(listing.address)}/${listing.id}`}
          shallow={false}
        >
          <div className={s.card__imgWrap}>
            {
              listing?.avatar
                ? <img className={s.card__img} src={listing.avatar} alt=""/>
                : <img src="/images/gallery.svg" alt=""/>
            }
            <Moment className={s.card__date} fromNow>{listing.date}</Moment>
          </div>
        </Link>
        <div className={s.card__desc}>
          <div className={s.card__price}>
            {
              listing.price
                ? <>
                  <span>${listing.price && listing.price?.toLocaleString('en')}</span>
                  {listing.actionType === 'Rent' && '/mo'}
                </>
                : <>No price</>
            }
          </div>
          <div className={s.card__address}>
            {listing.address}
          </div>
        </div>
        <div className={s.card__statistics}>
          <div className={s.card__statisticsItem}>
            <i className="icon-bed"/>
            <span>{listing.beds || '-'}</span>
          </div>
          <div className={s.card__statisticsItem}>
            <i className="icon-bath"/>
            <span>{listing.baths || '-'}</span>
          </div>
          <div className={s.card__statisticsItem}>
            <i className="icon-ruler"/>
            <span>
                {
                  listing.squareFeet
                    ? `${listing.squareFeet?.toLocaleString('en')} ft`
                    : '-'
                }
              </span>
          </div>
        </div>
      </div>
      <div className={s.card__like} onClick={onChangeFavorite}>
        <i className={listing.isFavorite ? 'icon-heart-full' : 'icon-heart-line'}/>
      </div>
    </div>
  );
};
