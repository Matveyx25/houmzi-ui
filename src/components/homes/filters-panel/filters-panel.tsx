import React from 'react';
import s from './filters-panel.module.scss';
import { Select } from '../select/select';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { actionTypes } from '../../../data/buy/actionTypes.data';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';
import { GooglePlacesAutocomplete } from '../../shared/google-places-autocomplete/google-places-autocomplete';
import { ChangeStateButton } from '../change-state-button/change-state-button';
import { Radio } from '../../shared/radio/radio';
import { AllFilters } from '../all-filters/all-filters';
import { ActionTypes } from '../action-types/action-types';
import { RadioGroup } from '../../shared/radio-group/radio-group';
import { removeBodyStyles, switchBodyStyles } from '../../../helpers/body-styles';

interface IProps {
  windowWidth: number
  listingConfig: IListingConfig
  query: any
  isActiveMap: boolean
  location: string

  setFilter(name: string, value: string | boolean): void

  saveSearch(): void

  selectLocation(value: string): void

  changeActiveScene(): void

  clearFilters(): void
}

interface IState {
  isOpenedFilters: boolean
  search: string
  priceFrom: string
  priceTo: string
  areaFrom: string
  areaTo: string
  yearFrom: string
  yearTo: string
  filtersRef: React.RefObject<HTMLDivElement>
}

export class FiltersPanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpenedFilters: false,
      search: '',
      priceFrom: '',
      priceTo: '',
      areaFrom: '',
      areaTo: '',
      yearFrom: '',
      yearTo: '',
      filtersRef: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    const { location } = this.props;

    if (location) this.setState({ search: location });

    document.addEventListener('mousedown', this.handleClickOutside);
    switchBodyStyles(this.props.windowWidth, 768);
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { query, location } = this.props;

    if (this.props !== prevProps) {
      if (location) {
        this.setState({ search: location });
      }

      if (query) {
        this.setState({
          priceFrom: query?.priceFrom || '',
          priceTo: query?.priceTo || '',
          areaFrom: query?.areaFrom || '',
          areaTo: query?.areaTo || '',
          yearFrom: query?.yearFrom || '',
          yearTo: query?.yearTo || '',
        });
      }
    }
    switchBodyStyles(this.props.windowWidth, 768);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    removeBodyStyles();
  }

  setPrice = (): string => {
    const { priceFrom, priceTo } = this.state;

    if (priceFrom && priceTo) {
      return `$${this.roundValue(priceFrom)}-$${this.roundValue(priceTo)}`;
    } else if (priceFrom) {
      return `$${this.roundValue(priceFrom)}+`;
    } else if (priceTo) {
      return `$0-$${this.roundValue(priceTo)}`;
    } else {
      return '';
    }
  };

  setArea = (): string => {
    const { areaFrom, areaTo } = this.state;

    if (areaFrom && areaTo) {
      return `${this.roundValue(areaFrom)}ft-${this.roundValue(areaTo)}ft`;
    } else if (areaFrom) {
      return `${this.roundValue(areaFrom)}ft+`;
    } else if (areaTo) {
      return `0ft-${this.roundValue(areaTo)}ft`;
    } else {
      return '';
    }
  };

  roundValue = (value: string): string => {
    if (+value >= 1000000) {
      return `${(+value / 1000000).toFixed()}m`;
    } else if (+value >= 1000) {
      return `${(+value / 1000).toFixed()}k`;
    } else {
      return value;
    }
  };

  changeLocation = (search: string) => {
    this.setState({ search: search });
  };

  selectLocation = (value: string) => {
    const { selectLocation } = this.props;

    this.changeLocation(value);
    selectLocation(value);
  };

  findOption = (list: IOption[], value: string): string => {
    const findOption: IOption = list?.find(({ key }: IOption) => key === value);

    if (findOption) {
      return findOption.key === 'any' ? '' : findOption.value;
    }
  };

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'priceFrom']: value });
  };

  switchAllFilter = () => {
    const { isOpenedFilters } = this.state;

    this.setState({ isOpenedFilters: !isOpenedFilters });
  };

  handleClickOutside = (e: any) => {
    const { filtersRef } = this.state;

    if (filtersRef.current && !filtersRef.current.contains(e.target)) {
      this.setState({ isOpenedFilters: false });
    }
  };

  clearFilters = () => {
    this.setState({
      priceFrom: '',
      priceTo: '',
      areaFrom: '',
      areaTo: '',
      yearFrom: '',
      yearTo: '',
    });

    this.props.clearFilters();
  };

  render(): React.ReactElement {
    const {
      windowWidth, listingConfig, setFilter,
      saveSearch, isActiveMap, changeActiveScene, query,
    } = this.props;
    const {
      isOpenedFilters, search, priceFrom,
      priceTo, areaFrom, areaTo, filtersRef,
    } = this.state;

    return (
      <section className={s.filters}>
        <GooglePlacesAutocomplete
          value={search}
          className={s.filters__search}
          placeholder="Search"
          isHideError
          types={['(regions)']}
          onChange={this.changeLocation}
          onSelect={this.selectLocation}
        />
        <Select
          placeholder="Offer type"
          value={this.findOption(actionTypes, query.actionType)}
          hidden={windowWidth < 768}
        >
          <div className={s.select__content}>
            <ActionTypes actionType={query.actionType} selectOption={setFilter}/>
          </div>
        </Select>
        <Select placeholder="Price" value={this.setPrice()} hidden={windowWidth < 1024}>
          <div className={s.select__filterRange}>
            <Input
              className={s.select__input}
              name="priceFrom"
              isHideError
              value={priceFrom}
              onChange={this.onChange}
              onBlur={() => setFilter('priceFrom', priceFrom)}
            />
            <div className={s.select__divider}>
              &mdash;
            </div>
            <Input
              className={s.select__input}
              name="priceTo"
              isHideError
              value={priceTo}
              onChange={this.onChange}
              onBlur={() => setFilter('priceTo', priceTo)}
            />
          </div>
        </Select>
        <Select
          placeholder="Beds"
          value={this.findOption(listingConfig?.generalNumbers, query.beds)}
          hidden={windowWidth < 1024}
        >
          <div className={s.select__content}>
            <Radio
              name="beds"
              checked={!query.beds}
              onChange={() => setFilter('beds', '')}
            >
              Any
            </Radio>
            <RadioGroup
              name="beds"
              value={query.beds}
              options={listingConfig?.generalNumbers}
              selectOption={setFilter}
            />
          </div>
        </Select>
        <Select placeholder="Square" value={this.setArea()} hidden={windowWidth < 1200}>
          <div className={s.select__filterRange}>
            <Input
              className={s.select__input}
              name="areaFrom"
              isHideError
              value={areaFrom}
              onChange={this.onChange}
              onBlur={() => setFilter('areaFrom', areaFrom)}
            />
            <div className={s.select__divider}>
              &mdash;
            </div>
            <Input
              className={s.select__input}
              name="areaTo"
              isHideError
              value={areaTo}
              onChange={this.onChange}
              onBlur={() => setFilter('areaTo', areaTo)}
            />
          </div>
        </Select>
        <div className={s.filters__all} ref={filtersRef}>
          <Button className={s.filters__btn} color="blueBorder" onClick={this.switchAllFilter}>
            More
          </Button>
          <AllFilters
            windowWidth={windowWidth}
            listingConfig={listingConfig}
            query={{ ...query, ...this.state }}
            visible={isOpenedFilters}
            onClose={this.switchAllFilter}
            onChange={this.onChange}
            setFilter={setFilter}
            clearFilters={this.clearFilters}
          />
        </div>
        <Button className={s.filters__btn} color="blue" onClick={saveSearch}>
          Save search
        </Button>
        {
          windowWidth >= 768 && windowWidth < 1024 &&
          <ChangeStateButton isActiveMap={isActiveMap} changeActiveScene={changeActiveScene}/>
        }
      </section>
    );
  }
}
