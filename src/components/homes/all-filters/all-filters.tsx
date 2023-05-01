import React from 'react';
import s from './all-filters.module.scss';
import c from 'classnames';
import { FilterBlock } from '../filter-block/filter-block';
import { actionTypes } from '../../../data/buy/actionTypes.data';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { IOption } from '../../../interfaces/shared/option.interface';
import { RadioGroup } from '../../shared/radio-group/radio-group';
import { Input } from '../../shared/input/input';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Radio } from '../../shared/radio/radio';
import { ActionTypes } from '../action-types/action-types';

interface IProps {
  windowWidth: number
  listingConfig: IListingConfig
  query: any
  visible: boolean

  onClose(): void

  onChange(e: React.FormEvent<HTMLInputElement>): void

  setFilter(name: string, value: string | boolean): void

  clearFilters(): void
}

interface IState {
  animationType: 'leave' | 'enter'
  isShow: boolean
}

export class AllFilters extends React.Component<IProps, IState> {
  actionTypes: IOption[] = actionTypes;

  constructor(props: IProps) {
    super(props);

    this.state = { animationType: 'leave', isShow: false };
  }

  componentDidMount(): void {
    if (this.props.visible) this.enter();
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (this.props.visible && !prevProps.visible) this.enter();
    if (!this.props.visible && prevProps.visible) this.leave();
  }

  enter = () => {
    this.setState({ isShow: true, animationType: 'enter' });
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  };

  leave = () => {
    this.setState({ animationType: 'leave' });
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
  };

  animationEnd = () => {
    const { animationType } = this.state;

    if (animationType === 'leave') this.setState({ isShow: false });
  };

  render(): React.ReactElement {
    const { windowWidth, listingConfig, query, onClose, onChange, setFilter, clearFilters } = this.props;
    const { animationType, isShow } = this.state;
    const { actionType, priceFrom, priceTo, beds, areaFrom, areaTo, baths, yearFrom, yearTo, airConditioner } = query;

    return isShow
      ? <div className={c(s.allFilters, s[`fade_${animationType}`])} onAnimationEnd={this.animationEnd}>
        <div className={s.allFilters__header}>
          <div className={s.allFilters__clear} onClick={clearFilters}>
            Clear all
          </div>
          {
            windowWidth < 768 &&
            <i className={c(s.allFilters__close, 'icon-close')} onClick={onClose}/>
          }
        </div>
        <div className={s.allFilters__scroll}>
          <div className={s.allFilters__content}>
            <FilterBlock title="Offer types" hidden={windowWidth >= 768}>
              <ActionTypes actionType={actionType} selectOption={setFilter}/>
            </FilterBlock>
            <FilterBlock title="Prices" classContent={s.allFilters__filterRange} hidden={windowWidth >= 1024}>
              <Input
                className={s.allFilters__input}
                name="priceFrom"
                isHideError
                value={priceFrom}
                onChange={onChange}
                onBlur={() => setFilter('priceFrom', priceFrom)}
              />
              <div className={s.allFilters__divider}>
                &mdash;
              </div>
              <Input
                className={s.allFilters__input}
                name="priceTo"
                isHideError
                value={priceTo}
                onChange={onChange}
                onBlur={() => setFilter('priceTo', priceTo)}
              />
            </FilterBlock>
            <FilterBlock title="Beds" hidden={windowWidth >= 1024}>
              <Radio name="beds" checked={!beds} onChange={() => setFilter('beds', '')}>
                Any
              </Radio>
              <RadioGroup name="beds" value={beds} options={listingConfig?.generalNumbers} selectOption={setFilter}/>
            </FilterBlock>
            <FilterBlock title="Square" classContent={s.allFilters__filterRange} hidden={windowWidth >= 1200}>
              <Input
                className={s.allFilters__input}
                name="areaFrom"
                isHideError
                value={areaFrom}
                onChange={onChange}
                onBlur={() => setFilter('areaFrom', areaFrom)}
              />
              <div className={s.allFilters__divider}>
                &mdash;
              </div>
              <Input
                className={s.allFilters__input}
                name="areaTo"
                isHideError
                value={areaTo}
                onChange={onChange}
                onBlur={() => setFilter('areaTo', areaTo)}
              />
            </FilterBlock>
            <FilterBlock title="Baths">
              <Radio name="baths" checked={!baths} onChange={() => setFilter('baths', '')}>
                Any
              </Radio>
              <RadioGroup name="baths" value={baths} options={listingConfig?.generalNumbers} selectOption={setFilter}/>
            </FilterBlock>
            <FilterBlock title="Year Built" classContent={s.allFilters__filterRange}>
              <Input
                className={s.allFilters__input}
                name="yearFrom"
                isHideError
                value={yearFrom}
                onChange={onChange}
                onBlur={() => setFilter('yearFrom', yearFrom)}
              />
              <div className={s.allFilters__divider}>
                &mdash;
              </div>
              <Input
                className={s.allFilters__input}
                name="yearTo"
                isHideError
                value={yearTo}
                onChange={onChange}
                onBlur={() => setFilter('yearTo', yearTo)}
              />
            </FilterBlock>
            <FilterBlock title="Other Amenities">
              <Checkbox
                checked={airConditioner}
                onClick={() => setFilter('airConditioner', !query?.airConditioner)}
              >
                Must have A/C
              </Checkbox>
            </FilterBlock>
          </div>
        </div>
      </div>
      : null;
  }
}
