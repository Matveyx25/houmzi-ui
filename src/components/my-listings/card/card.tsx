import React from 'react';
import s from './card.module.scss';
import { CardWrap } from '../card-wrap/card-wrap';
import { DeleteListing } from '../delete-listing/delete-listing';
import { IListingCard } from '../../../interfaces/my-listings/listing-card.interface';
import Link from 'next/link';
import { Button } from '../../shared/button/button';
import { Popup } from '../../shared/popup/popup';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends WithRouterProps {
  listing: IListingCard
  draft?: boolean

  deleteListing(id: string): void

  publishListing(id: string): void
}

interface IState {
  isOpenedPopup: boolean
}

class Card extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isOpenedPopup: false };

    this.switchPopup = this.switchPopup.bind(this);
    this.publishListing = this.publishListing.bind(this);
  }

  switchPopup() {
    const { isOpenedPopup } = this.state;

    this.setState({ isOpenedPopup: !isOpenedPopup });
  }

  publishListing() {
    const { listing, publishListing, router } = this.props;

    publishListing(listing.id);
    router.push('/dashboard/my-listings');
  }

  render(): React.ReactElement {
    const { listing, draft, deleteListing } = this.props;
    const { isOpenedPopup } = this.state;

    return (
      <>
        <CardWrap className={s.card}>
          <div className={s.card__imgWrap}>
            {
              listing?.avatar
                ? <img src={listing?.avatar} alt="" className={s.card__img}/>
                : <img src="/images/gallery.svg" alt=""/>
            }
          </div>
          <div className={s.card__info}>
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
            {
              !draft
              && <div className={s.card__statistics}>
                <div>
                  <i className="icon-visible"/>
                  {listing?.views}
                </div>
                <div>
                  <i className="icon-heart-full"/>
                  {listing?.favorite}
                </div>
              </div>
            }
          </div>
          <div className={s.card__footer}>
            <Link href={`/edit-listing/${listing?.id}`}>
              <Button className={s.card__btn} color="blue">
                Edit
              </Button>
            </Link>
            {
              draft
                ? <div className={s.card__update} onClick={this.publishListing}>
                  Publish now
                </div>
                : <div className={s.card__update}>
                  Upgrade to Premium
                </div>
            }
          </div>
          <div className={s.card__actions}>
            <div>
              <i className="icon-print"/>
            </div>
            <div>
              <i className="icon-trash" onClick={this.switchPopup}/>
            </div>
          </div>
        </CardWrap>

        <Popup
          title="Are you sure you want to remove the listing?"
          visible={isOpenedPopup}
          onClose={this.switchPopup}
        >
          <DeleteListing listing={listing} deleteListing={deleteListing} closePopup={this.switchPopup}/>
        </Popup>
      </>
    );
  }
}

export default withRouter(Card);
