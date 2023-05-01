import React from 'react';
import s from './listing-card.module.scss';
import c from 'classnames';
import Moment from 'react-moment';
import { IListingCard } from '../../../../../interfaces/buy/listing-card.interface';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { stringToUrl } from '../../../../../helpers/url-parser.helper';

interface IProps extends WithRouterProps {
  listing: IListingCard
  cluster?: boolean

  getListing(id: string): void
}

const ListingCard: React.FC<IProps> = ({ listing, cluster, router, getListing }) => {
  const openListing = () => {
    router.push(
      `/homes/?listingAddress=${listing.address}&listingId=${listing.id}`,
      `/homedetails/${stringToUrl(listing.address)}/${listing.id}`,
    );

    getListing(listing.id);
  };

  return (
    <div className={c(s.card, cluster && s.card_cluster)} onClick={openListing}>
      <div className={s.card__wrap}>
        <img
          className={listing?.avatar && s.card__img}
          src={listing.avatar ?? '/images/gallery.svg'}
          alt=""
        />
        <Moment className={s.card__date} fromNow>{listing.date}</Moment>
      </div>
      <div className={s.card__price}>
        {
          listing?.price
            ? <>
              <span>${listing.price && listing.price?.toLocaleString('en')}</span>
              {listing.actionType === 'Rent' && '/mo'}
            </>
            : <>No price</>
        }
      </div>
      <div className={s.card__params}>
        <div className={s.card__param}>
          <i className="icon-bed"/>
          <span>{listing?.beds ?? '-'}</span>
        </div>
        <div className={s.card__param}>
          <i className="icon-bath"/>
          <span>{listing?.baths ?? '-'}</span>
        </div>
        <div className={s.card__param}>
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
  );
};

export default withRouter(ListingCard);
