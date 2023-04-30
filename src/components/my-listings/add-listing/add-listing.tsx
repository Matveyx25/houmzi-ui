import React from 'react';
import s from './add-listing.module.scss';
import { ICreateListingData } from '../../../interfaces/my-listings/create-listing-data.interface';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Select } from '../../shared/select/select';
import { GooglePlacesAutocomplete } from '../../shared/google-places-autocomplete/google-places-autocomplete';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Button } from '../../shared/button/button';
import { GoogleMap } from '../../shared/google-map/google-map';
import { Coords } from 'google-map-react';

interface IProps {
  listingConfig: IListingConfig

  createListing(createListingData: ICreateListingData): void
}

interface IState {
  propertyType: IOption
  actionType: IOption
  address: string
  hideAddress: boolean
  lat: number
  lng: number
  isShowCard: boolean
  city: string
  country: string
}

export class AddListing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      propertyType: null!, actionType: null!,
      address: '', hideAddress: false,
      lat: 0, lng: 0,
      isShowCard: false,
      city: '', country: '',
    };
  }

  onChange = (address: string) => {
    this.setState({ address });
  };

  onSelect = (name: string, option: IOption) => {
    this.setState({ [name as 'propertyType']: option });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { createListing } = this.props;
    const { propertyType, actionType, address, hideAddress, lat, lng, city, country } = this.state;

    createListing({
      propertyType: propertyType.key,
      actionType: actionType.key,
      address, hideAddress,
      lat, lng,
      city, country,
    });
    e.preventDefault();
  };

  onSelectAddress = async (address: string) => {
    this.setState({ address });
    const location: Coords = await geocodeByAddress(address).then(results => getLatLng(results[0]));
    this.setState({ ...location });
    this.getCityAndCountry(new google.maps.LatLng(location));
  };

  getCityAndCountry = (location: google.maps.LatLng) => {
    new google.maps.Geocoder().geocode({ location }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let country = null, countryCode = null, city = null, cityAlt = null;
          let c, lc, component;
          for (let r = 0, rl = results.length; r < rl; r += 1) {
            let result = results[r];

            if (!city && result.types[0] === 'locality') {
              for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                component = result.address_components[c];

                if (component.types[0] === 'locality') {
                  city = component.long_name;
                  break;
                }
              }
            } else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
              for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                component = result.address_components[c];

                if (component.types[0] === 'administrative_area_level_1') {
                  cityAlt = component.long_name;
                  break;
                }
              }
            } else if (!country && result.types[0] === 'country') {
              country = result.address_components[0].long_name;
              countryCode = result.address_components[0].short_name;
            }

            if (city && country) {
              break;
            }
          }
          this.setState({ city, country });
        }
      }
    });
  };

  render(): React.ReactElement {
    const { listingConfig } = this.props;
    const { propertyType, actionType, address, hideAddress, isShowCard, lat, lng } = this.state;

    return (
      <div className={s.addListing}>
        <form className={s.addListing__form} onSubmit={this.onSubmit}>
          <Select
            className={s.addListing__property}
            options={listingConfig?.propertyType}
            value={propertyType}
            placeholder={'Property type'}
            onSelect={(option: IOption) => this.onSelect('propertyType', option)}
          />
          <Select
            className={s.addListing__action}
            options={listingConfig?.propertyAction}
            value={actionType}
            placeholder={'Action type'}
            onSelect={(option: IOption) => this.onSelect('actionType', option)}
          />
          <GooglePlacesAutocomplete
            value={address}
            onChange={this.onChange}
            onSelect={this.onSelectAddress}
            className={s.addListing__address}
            dropDownClassName={s.addListing__addressDropdown}
            placeholder="Address"
          />
          <div className={s.addListing__actions}>
            <Checkbox
              className={s.addListing__hideAddress}
              checked={hideAddress}
              onClick={() => this.setState({ hideAddress: !hideAddress })}
            >
              Hide address for
              <span className={s.addListing__hideAddressPrice}> €4.99</span>
            </Checkbox>
            {
              address && !isShowCard &&
              <div
                className={s.addListing__checkAddress}
                onClick={() => this.setState({ isShowCard: true })}>
                Check address
              </div>
            }
          </div>
          {
            isShowCard &&
            <GoogleMap className={s.addListing__map} center={{ lat, lng }} point/>
          }
          <Button
            color="blue"
            full
            disabled={!propertyType?.value || !actionType?.value || !address}
            className={s.addListing__btn}
          >
            Create my listing
          </Button>
          <span className={s.addListing__desc}>
            By clicking Create my listing or Manage my property, you agree to comply with our
            <a href="/#"> Terms of Use</a>,
            <a href="/#"> Rental User Terms </a>
            and
            <a href="/#"> Respectful Renting Pledge</a>.
          </span>
        </form>
      </div>
    );
  }
}
