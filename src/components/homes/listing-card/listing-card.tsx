import React from 'react';
import c from 'classnames';
import s from './listing-card.module.scss';
import { IListingCardWithClusterId } from '../../../interfaces/buy/listing-card.interface';
import Moment from 'react-moment';
import Link from 'next/link';
import { stringToUrl } from '../../../helpers/url-parser.helper';

interface IProps {
  premium?: boolean
  listing: IListingCardWithClusterId

  getListing?(id: string): void

  onChangeHoveredId?(id: string): void

  addFavorite?(id: string): void

  removeFavorite?(id: string): void
}

export const ListingCard: React.FC<IProps> = ({
                                                premium,
                                                listing,
                                                getListing,
                                                onChangeHoveredId,
                                                addFavorite,
                                                removeFavorite,
                                              }) => {
  const onChangeFavorite = () => {
    if (listing.isFavorite) {
      removeFavorite(listing.id);
    } else {
      addFavorite(listing.id);
    }
  };

  return (
    <div className={s.card__container}>
      <div
        className={c(s.card, premium && s.premium)}
        onMouseOver={() => onChangeHoveredId && onChangeHoveredId(listing.clusterId)}
        onMouseOut={() => onChangeHoveredId && onChangeHoveredId('')}
        onClick={() => getListing && getListing(listing.id)}
      >
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
            <div className={s.card__date}>
              <Moment fromNow>{listing.date}</Moment>
            </div>
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
