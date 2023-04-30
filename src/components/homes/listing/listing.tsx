import React from 'react';
import s from './listing.module.scss';
import c from 'classnames/bind';
import ListingActions from '../listing-actions/listing-actions';
import Moment from 'react-moment';
import { InfoItem } from '../info-item/info-item';
import { IListing } from '../../../interfaces/buy/listing.interface';
import { Button } from '../../shared/button/button';
import { IMedia } from '../../../interfaces/edit-listing/media.interface';
import { GoogleMap } from '../../shared/google-map/google-map';
import { InfoBlock } from '../info-block/info-block';
import { LayoutContext } from '../../../contexts/layout.context';

interface IProps {
  listing: IListing
  visible: boolean

  closePopup(): void

  openPopup(name: 'media' | 'agents' | 'counter-offer'): void

  addFavorite(): void

  removeFavorite(): void
}

interface IState {
  animationType: 'leave' | 'enter'
  isShow: boolean
}

export class Listing extends React.Component<IProps, IState> {
  static contextType = LayoutContext;

  constructor(props: IProps) {
    super(props);

    this.state = { animationType: 'leave', isShow: false };
  }

  componentDidMount(): void {
    if (this.props.visible) this.enter();
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (this.props.visible && !prevProps.visible) this.enter();
    if (!this.props.visible && prevProps.visible) this.leave();
  }

  enter = () => {
    this.setState({ isShow: true, animationType: 'enter' });
  };

  leave = () => {
    this.setState({ animationType: 'leave' });
  };

  animationEnd = () => {
    const { animationType } = this.state;

    if (animationType === 'leave') this.setState({ isShow: false });
  };

  renderImages = () => {
    const { listing, openPopup } = this.props;
    const { windowWidth } = this.context;
    const maxImg = windowWidth < 1440 ? 1 : 2;
    const filteredMedia: IMedia[] = listing?.media.filter((media: IMedia) => media.type === 'image');

    return filteredMedia?.length > 1 && filteredMedia
      .filter((media: IMedia) => media.url !== listing?.avatar)
      .map((media: IMedia, index: number) => {
        if (index <= maxImg) {
          return index === maxImg
            ? <div className={s.statistics__imgWrap} onClick={() => openPopup('media')}>
              <img key={media.id} className={s.statistics__img} src={media.url} alt=""/>
              <div className={s.statistics__imgBg}>
                <div className={s.statistics__imgText}>
                  <i className="icon-gallery"/> <span>{filteredMedia.length - (maxImg + 2)}</span>
                </div>
              </div>
            </div>
            : <img key={media.id} className={s.statistics__img} src={media.url} alt=""
                   onClick={() => openPopup('media')}/>;
        }
      });
  };

  render(): React.ReactElement | null {
    const { listing, closePopup, openPopup, addFavorite, removeFavorite } = this.props;
    const { animationType, isShow } = this.state;
    const { windowWidth } = this.context;
    let street: string = '';
    let city: string = '';

    listing?.address?.split(',').map((string: string, index: number, array: string[]) => {
      if (array.length === 1) {
        street = array.join('');
      } else if (index < array.length - 2 && s) {
        street += street ? `, ${string}` : string;
      } else {
        city += city ? `, ${string}` : string;
      }
    });

    return isShow
      ? <>
        {
          windowWidth >= 1024 &&
          <div className={s.listing__bg} onClick={closePopup}/>
        }
        <div
          className={c(s.listing, s[`fade_${animationType}`])}
          onAnimationEnd={this.animationEnd}
        >
          {
            windowWidth < 1024 &&
            <div className={s.listing__header}>
              <ListingActions
                isFavorite={listing?.isFavorite || false}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
              <i className="icon-close" onClick={closePopup}/>
            </div>
          }
          {
            windowWidth >= 1024 &&
            <div className={s.listing__close} onClick={closePopup}>
              <i className="icon-back"/>
            </div>
          }
          <div className={s.listing__content}>
            <div className={s.statistics}>
              <div className={c(s.statistics__media, listing?.media.length <= 1 && s.statistics__media_one)}>
                <div className={s.statistics__media_main}>
                  {
                    listing?.avatar
                      ? <img className={s.statistics__img} src={listing?.avatar} alt=""
                             onClick={() => openPopup('media')}/>
                      : <img src="/images/gallery.svg" alt=""/>
                  }
                </div>
                {this.renderImages()}
              </div>
              <div className={s.statistics__addressPrice}>
                <div className={s.statistics__address}>
                  {street}
                  <div className={s.statistics__address_city}>
                    {city}
                  </div>
                </div>
                <div className={s.statistics__price}>
                  <span className={s.statistics__price_current}>
                    {
                      listing?.price
                        ? `$${listing?.price.toLocaleString('en')}`
                        : <>No price</>
                    }
                  </span>
                  {/*<div className={s.statistics__price_old}>*/}
                  {/*  $550,000*/}
                  {/*</div>*/}
                </div>
                {
                  windowWidth >= 1024 &&
                  <ListingActions
                    isFavorite={listing?.isFavorite || false}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                  />
                }
              </div>
              <GoogleMap className={s.statistics__map} center={listing?.location} point/>
              <div className={s.statistics__counts}>
                <div className={s.count}>
                  <div className={s.count__label}>Published</div>
                  <div className={s.count__value}>
                    <Moment fromNow>{listing?.date}</Moment>
                  </div>
                </div>
                <div className={s.count}>
                  <div className={s.count__label}>Views</div>
                  <div className={s.count__value}>{listing?.views || 0}</div>
                </div>
                <div className={s.count}>
                  <div className={s.count__label}>Saves</div>
                  <div className={s.count__value}>{listing?.favoritesCount || 0}</div>
                </div>
              </div>
              <div className={s.statistics__buttons}>
                <Button color="blue" onClick={() => openPopup('agents')}>Agents</Button>
                <Button color="blueBorder" onClick={() => openPopup('counter-offer')}>Counteroffer</Button>
              </div>
            </div>
            <div className={s.info__wrap}>
              <div className={s.info}>
                {
                  (listing?.beds || listing?.baths || listing?.squareFeet || listing?.landArea
                    || listing?.built || listing?.parking || listing?.numberOfFloors || listing?.apartmentFloor
                    || !!listing?.price && !!listing?.squareFeet) &&
                  <InfoBlock>
                    <InfoItem label="Beds" icon="icon-bed" value={listing?.beds}/>
                    <InfoItem label="Baths" icon="icon-bath" value={listing?.baths}/>
                    <InfoItem label="Square feet" icon="icon-ruler" value={listing?.squareFeet} postfix="ft"/>
                    <InfoItem label="Land area" icon="icon-ruler" value={listing?.landArea} postfix="ft"/>
                    <InfoItem label="Built" value={listing?.built}/>
                    <InfoItem label="Parking" value={listing?.parking}
                              postfix={`place${listing?.parking > 1 ? 's' : ''}`}/>
                    <InfoItem label="Number of floors" value={listing?.numberOfFloors}/>
                    <InfoItem label="Apartment floor" value={listing?.apartmentFloor}/>
                    {
                      listing?.actionType === 'Sell' &&
                      <InfoItem
                        label="Price/sqft"
                        value={(+(listing?.price / listing?.squareFeet).toFixed()).toLocaleString('en')}
                        prefix="$"
                      />
                    }
                  </InfoBlock>
                }
                {
                  listing?.description &&
                  <InfoBlock title="Description">
                    <div className={s.info__desc}>
                      {
                        listing?.description
                          .split(/<br \/>/)
                          .map((item: string, index) => (
                            <span key={index}>
                              {index > 0 && <br/>}
                              {item}
                            </span>
                          ))
                      }
                    </div>
                  </InfoBlock>
                }
                {
                  (listing?.mls || listing?.cooling || listing?.roof || listing?.foundation || listing?.internet
                    || listing?.constructionType || listing?.waterHeater || typeof listing?.porch === 'boolean' || typeof listing?.balcony === 'boolean'
                    || typeof listing?.deck === 'boolean' || listing?.heatingSystem) &&
                  <InfoBlock title="Other details">
                    <InfoItem label="MLS ID" value={listing?.mls}/>
                    <InfoItem label="Cooling" value={listing?.cooling}/>
                    <InfoItem label="Roof" value={listing?.roof}/>
                    <InfoItem label="Foundation" value={listing?.foundation}/>
                    <InfoItem label="Internet" value={listing?.internet}/>
                    <InfoItem label="Type" value={listing?.constructionType}/>
                    <InfoItem label="Water heater" value={listing?.waterHeater}/>
                    <InfoItem label="Porch" value={listing?.porch ? 'Yes' : 'No'}/>
                    <InfoItem label="Balcony" value={listing?.balcony ? 'Yes' : 'No'}/>
                    <InfoItem label="Deck" value={listing?.deck ? 'Yes' : 'No'}/>
                    <InfoItem label="Heating sys." value={listing?.heatingSystem}/>
                  </InfoBlock>
                }
              </div>
            </div>
          </div>
        </div>
      </>
      : null;
  }
}
