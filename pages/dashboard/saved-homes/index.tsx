import React from 'react';
import s from './saved-homes.module.scss';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import { List } from '../../../src/components/saved-homes/list/list';
import { IRootState } from '../../../src/store/reducers';
import { connect } from 'react-redux';
import { listings } from '../../../src/store/selectors/saved-homes.selectors';
import { Dispatch, Store } from 'redux';
import {
  AddFavorite,
  GetListingsFailed, GetListingsSuccess, RemoveFavorite,
  SavedHomesActions,
} from '../../../src/store/actions/saved-homes.actions';
import { IListingCard, IListingCardWithClusterId } from '../../../src/interfaces/buy/listing-card.interface';
import { GoogleMap } from '../../../src/components/shared/google-map/google-map';
import { GetListing, SearchListingsActions } from '../../../src/store/actions/search-listings.actions';
import { Coords } from 'google-map-react';
import { Layout } from '../../../src/containers/layout/layout-container';
import { ILayoutContext, LayoutContext } from '../../../src/contexts/layout.context';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../../src/store/store';
import { getListings } from '../../../src/services/saved-homes.service';

interface IProps {
  listings: IListingCard[]

  getListing?(id: string): void

  addFavorite?(id: string): void

  removeFavorite?(id: string): void
}

interface IState {
  hoveredId: string
  listings: IListingCardWithClusterId[]
  center: Coords
}

class SavedHomes extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hoveredId: '',
      listings: [],
      center: undefined,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      const center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      this.setState({ center });
    });
  }

  setBounds = () => {
    const { listings } = this.props;
    let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds;

    if (listings.length) {
      listings.map(({ lat, lng }: IListingCard) => {
        let position = new google.maps.LatLng(lat, lng);

        bounds.extend(position);
      });

      return bounds;
    }
  };

  setListings = (listings: IListingCardWithClusterId[]) => {
    this.setState({ listings });
  };

  onChangeHoveredId = (id: string) => {
    this.setState({ hoveredId: id });
  };

  render(): React.ReactElement {
    const { listings: mapListings, ...props } = this.props;
    const { hoveredId, listings, center } = this.state;
    const { getListing } = props;

    return (
      <Layout title="Saved Homes">
        <DashboardContainer>
          <div className={s.wrap}>
            <LayoutContext.Consumer>
              {
                (context: ILayoutContext) => context.windowWidth >= 1024 &&
                  <GoogleMap
                    listings={mapListings}
                    bounds={this.setBounds()}
                    center={center}
                    hoveredId={hoveredId}
                    setListings={this.setListings}
                    getListing={getListing}
                  />
              }
            </LayoutContext.Consumer>
            <List listings={listings} {...props} onChangeHoveredId={this.onChangeHoveredId}/>
          </div>
        </DashboardContainer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  listings: listings(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchListingsActions | SavedHomesActions>) => ({
  addFavorite: (id: string) => dispatch(new AddFavorite(id)),
  removeFavorite: (id: string) => dispatch(new RemoveFavorite(id)),
  getListing: (id: string) => dispatch(new GetListing(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedHomes);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext & { store: Store }) => {
    const { dispatch } = ctx.store;

    await getListings(ctx)
      .then((listings: IListingCard[]) => dispatch(new GetListingsSuccess(listings)))
      .catch(() => dispatch(new GetListingsFailed()));
  },
);
