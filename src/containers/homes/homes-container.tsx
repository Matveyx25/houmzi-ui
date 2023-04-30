import React from 'react';
import s from './homes.module.scss';
import { IListingCard, IListingCardWithClusterId } from '../../interfaces/buy/listing-card.interface';
import { ISearchParams } from '../../interfaces/buy/search-params.interface';
import { IRootState } from '../../store/reducers';
import { count, listings } from '../../store/selectors/search-listings.selectors';
import { Dispatch } from 'redux';
import {
  AddFavorite,
  GetListing,
  GetListings,
  RemoveFavorite,
  SearchListingsActions,
} from '../../store/actions/search-listings.actions';
import { ListingActions } from '../../store/actions/listing.actions';
import { SavedSearchesActions, SaveSearch } from '../../store/actions/saved-searches.actions';
import { connect } from 'react-redux';
import { ListingList } from '../../components/homes/listing-list/listing-list';
import { GoogleMap } from '../../components/shared/google-map/google-map';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Header } from '../../components/homes/header/header';
import ListingContainer from './listing-container';
import { listingConfig } from '../../store/selectors/lisitng.selectors';
import { ISaveSearchParams } from '../../interfaces/buy/save-search-params.interface';
import { FiltersPanel } from '../../components/homes/filters-panel/filters-panel';
import { IListingConfig } from '../../interfaces/edit-listing/listing-config.interface';
import { Coords } from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { stringToUrl, urlToString } from '../../helpers/url-parser.helper';
import { Layout } from '../layout/layout-container';
import { ILayoutContext, LayoutContext } from '../../contexts/layout.context';

interface IProps extends WithRouterProps {
  listings: IListingCard[]
  count: number
  location?: string
  zoom?: number
  listingConfig: IListingConfig

  getListings(params: ISearchParams): void

  addFavorite(id: string): void

  removeFavorite(id: string): void

  getListing(id: string): void

  saveSearch(params: ISaveSearchParams): void
}

interface IState {
  isActiveMap: boolean
  hoveredId: string
  coordinates: string
  center: Coords
  zoom: number
  location: string
  listings: IListingCardWithClusterId[]
}

class HomesContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isActiveMap: true,
      hoveredId: '',
      coordinates: '',
      center: { lat: 49.651252414772244, lng: 10.072280870953279 },
      zoom: this.props.zoom || 4,
      location: '',
      listings: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;

    if (location) {
      this.setState({ location });
      geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          this.setState({ center: { lat, lng } }),
        );
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
    const { location, zoom, router } = this.props;
    const { query } = router;

    location !== prevProps.location && this.setState({ location });
    zoom !== prevProps.zoom && this.setState({ zoom });

    if (query.location !== prevProps.router.query.location) {
      location && this.setState({
        location: urlToString(query.location as string),
        zoom: 11,
      });
      geocodeByAddress(urlToString(query.location as string))
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          this.setState({ center: { lat, lng } }),
        );
    }
  }

  googleMap = (): React.ReactElement => {
    const { listings } = this.props;
    const { hoveredId, center, zoom } = this.state;

    return <GoogleMap
      listings={listings}
      center={center}
      zoom={zoom}
      mapButton
      drawingPanel
      zoomPanel
      hoveredId={hoveredId}
      className={s.buy__map}
      setListings={this.setListings}
      setPath={this.setPath}
      getListing={this.getListing}
    />;
  };

  listingList = (): React.ReactElement => {
    const { count, addFavorite, removeFavorite } = this.props;
    const { listings } = this.state;

    return <ListingList
      listings={listings}
      count={count}
      getListing={this.getListing}
      onChangeHoveredId={this.onChangeHoveredId}
      addFavorite={addFavorite}
      removeFavorite={removeFavorite}
      setSort={this.setSort}
      removeSort={this.removeSort}
    />;
  };

  setListings = (listings: IListingCardWithClusterId[]) => {
    this.setState({ listings });
  };

  setPath = (coordinates: string) => {
    const { router, getListings } = this.props;

    getListings({ ...router.query, coordinates });
    this.setState({ coordinates });
  };

  onChangeHoveredId = (id: string) => {
    this.setState({ hoveredId: id });
  };

  setSort = (sortField: string, direction: number) => {
    const { router, getListings } = this.props;
    const { coordinates } = this.state;
    const { pathname, query } = router;
    const newQuery = { ...query, sortField, direction };

    router.push(`${pathname}/?${this.parseParams(newQuery)}`, undefined, { shallow: true });
    getListings({ ...newQuery, coordinates });
  };

  removeSort = () => {
    const { router, getListings } = this.props;
    const { coordinates } = this.state;
    const { sortField, direction, ...query } = router.query;

    router.push(`${router.pathname}/?${this.parseParams(query)}`, undefined, { shallow: true });
    getListings({ ...query, coordinates });
  };

  setFilter = (name: string, value: string | boolean) => {
    const { getListings, router } = this.props;
    const { coordinates } = this.state;
    const { pathname } = router;
    let newQuery;

    if (value) {
      newQuery = { ...router.query, [name]: value };
    } else {
      const { [name]: item, ...query } = router.query;
      newQuery = query;
    }

    router.push(`${pathname}/?${this.parseParams(newQuery)}`, undefined, { shallow: true });
    getListings({ ...newQuery, coordinates });
  };

  selectLocation = (value: string) => {
    const { router } = this.props;
    const { location, ...query } = router.query;

    router.push(
      `/homes/${stringToUrl(value)}/?${this.parseParams(query)}`,
      undefined,
      { shallow: true },
    );
  };

  parseParams = (query: any): string => {
    let params = '';

    for (let key in query) {
      params += `${key}=${query[key]}&`;
    }

    return params;
  };

  saveSearch = () => {
    const { router, saveSearch } = this.props;
    const { location: name, center } = this.state;
    const { sortField, direction, ...query } = router.query;

    saveSearch({ ...query, name, ...center });
  };

  changeActiveScene = () => {
    const { isActiveMap } = this.state;

    this.setState({ isActiveMap: !isActiveMap });
  };

  clearFilters = () => {
    const { router, getListings } = this.props;
    const { coordinates } = this.state;
    const { location } = router.query;

    router.push(`/homes/${location ? location : ''}`, undefined, { shallow: true });
    getListings({ coordinates });
  };

  getListing = (id: string) => {
    const country = this.props.router.query.location;

    if (country) {
      localStorage.setItem('lastCountry', JSON.stringify({ id, country }));
    }
    this.props.getListing(id);
  };

  render(): React.ReactElement {
    const { listingConfig, router } = this.props;
    const { isActiveMap, location } = this.state;
    const { query } = router;

    return (
      <Layout title={location ? [location, 'Homes'] : 'Homes'}>
        <LayoutContext.Consumer>
          {
            ({ windowWidth }: ILayoutContext) => (
              <div className={s.buy}>
                <FiltersPanel
                  windowWidth={windowWidth}
                  listingConfig={listingConfig}
                  query={query}
                  isActiveMap={isActiveMap}
                  location={location}
                  setFilter={this.setFilter}
                  selectLocation={this.selectLocation}
                  saveSearch={this.saveSearch}
                  changeActiveScene={this.changeActiveScene}
                  clearFilters={this.clearFilters}
                />
                <Header windowWidth={windowWidth} isActiveMap={isActiveMap} changeActiveScene={this.changeActiveScene}/>
                <div className={s.buy__content}>
                  {
                    windowWidth >= 1024
                      ? <>
                        {this.googleMap()}
                        {this.listingList()}
                      </>
                      : isActiveMap
                      ? this.googleMap()
                      : this.listingList()
                  }
                </div>
                <ListingContainer/>
              </div>
            )
          }
        </LayoutContext.Consumer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  listings: listings(state),
  count: count(state),
  listingConfig: listingConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchListingsActions | ListingActions | SavedSearchesActions>) => ({
  getListings: (params: ISearchParams) => dispatch(new GetListings(params)),
  addFavorite: (id: string) => dispatch(new AddFavorite(id)),
  removeFavorite: (id: string) => dispatch(new RemoveFavorite(id)),
  getListing: (id: string) => dispatch(new GetListing(id)),
  saveSearch: (params: ISaveSearchParams) => dispatch(new SaveSearch(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomesContainer));
