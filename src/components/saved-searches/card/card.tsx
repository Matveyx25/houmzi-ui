import React from 'react';
import c from 'classnames';
import s from './card.module.scss';
import { ISavedSearch } from '../../../interfaces/saved-searches/saved-search.interface';
import { Popup } from '../../shared/popup/popup';
import { Rename } from '../rename/rename';
import { Parameter } from '../parameter/parameter';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { IOption } from '../../../interfaces/shared/option.interface';
import { GoogleMap } from '../../shared/google-map/google-map';
import { LayoutContext } from '../../../contexts/layout.context';
import { ShareButton } from '../../shared/share-button/share-button';
import Link from 'next/link';

interface IProps {
  savedSearch: ISavedSearch
  listingConfig: IListingConfig

  onRename(id: string, name: string): void

  onDelete(id: string): void
}

interface IState {
  isOpen: boolean
  link: string
}

enum params {
  beds = 'Beds',
  baths = 'Baths',
  yearTo = 'Year Max',
  yearFrom = 'Year Min',
  airConditioner = 'Air conditioner',
}

export class Card extends React.Component<IProps, IState> {
  static contextType = LayoutContext;

  constructor(props: IProps) {
    super(props);

    this.state = { isOpen: false, link: '' };
  }

  componentDidMount() {
    this.createLink();
  }

  onSwitchPopup = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onRename = (name: string) => {
    const { savedSearch, onRename } = this.props;

    onRename(savedSearch.id, name);
    this.onSwitchPopup();
  };

  onDelete = () => {
    const { savedSearch, onDelete } = this.props;

    onDelete(savedSearch.id);
  };

  setPrice = (): string => {
    const { priceFrom, priceTo } = this.props.savedSearch;

    if (priceFrom && priceTo) {
      return `$${this.roundValue(priceFrom)} - $${this.roundValue(priceTo)}`;
    } else if (priceFrom) {
      return `$${this.roundValue(priceFrom)}+`;
    } else if (priceTo) {
      return `$0 - $${this.roundValue(priceTo)}`;
    } else {
      return '';
    }
  };

  setArea = (): string => {
    const { areaFrom, areaTo } = this.props.savedSearch;

    if (areaFrom && areaTo) {
      return `${this.roundValue(areaFrom)} ft - ${this.roundValue(areaTo)} ft`;
    } else if (areaFrom) {
      return `${this.roundValue(areaFrom)} ft+`;
    } else if (areaTo) {
      return `0ft - ${this.roundValue(areaTo)} ft`;
    } else {
      return '';
    }
  };

  roundValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed()}m`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed()}k`;
    } else {
      return value.toString();
    }
  };

  createLink = () => {
    const { generalNumbers } = this.props.listingConfig;
    const { date, id, homeTypes, name, ...savedSearch } = this.props.savedSearch;
    const origin = window.location.origin;
    let params = '';

    for (let key in savedSearch) {
      let param;

      switch (key) {
        case 'actionType':
          param = savedSearch[key] === 'Sell' ? 'sell' : 'rent';
          break;
        case 'beds':
          param = generalNumbers
            .find(({ value }: IOption) => value.toString() === savedSearch[key]).key;
          break;
        default:
          param = JSON.stringify(savedSearch[key]);
      }

      params += `${key}=${param}&`;
    }

    this.setState({ link: `${origin}/homes/${name && name.replace(/ /g, '_')}?${params}` });
  };

  render(): React.ReactElement {
    const { savedSearch } = this.props;
    const { isOpen, link } = this.state;
    const { windowWidth } = this.context;

    return (
      <>
        <div className={s.card}>
          {
            windowWidth >= 768 &&
            <div className={s.card__mapWrap}>
              <GoogleMap className={s.card__map} center={savedSearch?.location} zoom={14}/>
              <ShareButton link={link} classNames={s.card__share}/>
            </div>
          }
          <div className={s.card__wrap}>
            <Link href={link}>
              <h3 className={s.card__title}>
                {savedSearch?.name || 'Text search'}
              </h3>
            </Link>
            <span className={s.card__type}>
              {savedSearch?.actionType === 'Sell' && 'For Sale'}
              {savedSearch?.actionType === 'Rent' && 'For Rent'}
            </span>
            {
              windowWidth < 768 &&
              <ShareButton link={link} position="left" classNames={s.card__share}/>
            }
          </div>
          {/*<div className={s.card__select}>*/}
          {/*  Instant*/}
          {/*  <i className="icon-arrows"/>*/}
          {/*</div>*/}
          <div className={s.card__params}>
            <Parameter label="Price" value={this.setPrice()}/>
            <Parameter label="Square" value={this.setArea()}/>
            {
              Object?.keys(savedSearch)
                .filter((key: string) => !key.includes('price') && !key.includes('area') && !key.includes('id') && !key.includes('date') && !key.includes('actionType') && !key.includes('name') && !key.includes('homeTypes') && !key.includes('location') && !key.includes('search'))
                .map((key: string) => (
                  <Parameter key={key} label={params[key]} value={savedSearch[key]}/>
                ))
            }
          </div>
          <div className={s.card__actions}>
            <button className={s.card__btn} onClick={this.onSwitchPopup}>
              Rename
            </button>
            <button className={c(s.card__btn, s.card__btn_red)} onClick={this.onDelete}>
              Delete search
            </button>
          </div>

          <Popup title="Rename Search" visible={isOpen} onClose={this.onSwitchPopup}>
            <Rename name={savedSearch?.name} onRename={this.onRename}/>
          </Popup>
        </div>
      </>
    );
  }

}
