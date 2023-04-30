import React from 'react';
import s from './country.module.scss';
import { IRootState } from '../../src/store/reducers';
import { GetListing, SearchListingsActions } from '../../src/store/actions/search-listings.actions';
import { getCities, getListings } from '../../src/services/country.service';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../src/store/store';
import { Dispatch, Store } from 'redux';
import { ICity } from '../../src/interfaces/saved-homes/city.interface';
import { IListingCard } from '../../src/interfaces/buy/listing-card.interface';
import { Cities, Listings, Params, Search } from '../../src/components/country';
import { connect } from 'react-redux';
import { listings } from '../../src/store/selectors/country.selectors';
import {
  AddFavorite,
  CountryActions,
  GetListingsSuccess,
  RemoveFavorite,
} from '../../src/store/actions/country.actions';
import { Layout } from '../../src/containers/layout/layout-container';

interface IProps {
  country: string
  type: string
  cities: ICity[]
  listings: IListingCard[]

  getListing(id: string): void

  addFavorite(id: string): void

  removeFavorite(id: string): void
}

const Type: React.FC<IProps> = ({ country, type, cities, ...props }) => {
  const changeType = (): string => type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Layout title={[country, changeType()]}>
      <div className={s.country}>
        <Search country={country} type={type}/>
        <Params/>
        <Cities country={country} cities={cities}/>
        <Listings country={country} {...props}/>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  listings: listings(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchListingsActions | CountryActions>) => ({
  getListing: (id: string) => dispatch(new GetListing(id)),
  addFavorite: (id: string) => dispatch(new AddFavorite(id)),
  removeFavorite: (id: string) => dispatch(new RemoveFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Type);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext<{ country: string, type: string }> & { store: Store }) => {
    const { country, type } = ctx.params;
    const newCountry = country[0].toUpperCase() + country.slice(1);
    const cities: ICity[] = await getCities(ctx, newCountry, changeTypeForServer(type));
    await getListings(ctx, newCountry, changeTypeForServer(type))
      .then((listings: IListingCard[]) => ctx.store.dispatch(new GetListingsSuccess(listings)));

    if (type === 'buy' || type === 'rent')
      return cities.length
        ? { props: { country: newCountry, type, cities } }
        : { redirect: { permanent: false, destination: '/homes' } };
    return { redirect: { permanent: false, destination: '/404' } };
  });

const changeTypeForServer = (type: string): string =>
  type === 'buy' ? 'sell' : type;
