import React from 'react';
import s from './amenities.module.scss';
import { Block } from '../block/block';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Radio } from '../../shared/radio/radio';

interface IProps {
  listingConfig: IListingConfig
  listingData: any

  updateData(data: any): void
}

interface IState {
  additionalAmenities: string
}

export class Amenities extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { additionalAmenities: '' };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { listingData } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        additionalAmenities: listingData?.additionalAmenities,
      });
    }
  }

  onChange = (name: string, value: string) => {
    const { updateData } = this.props;

    this.setState({
      [name as 'additionalAmenities']: value,
    });

    if (name === 'laundryType') {
      updateData({ [name]: value });
    }
  };

  onBlur = (name: string, value: string) => {
    const { updateData } = this.props;

    updateData({ [name]: value });
  };

  render(): React.ReactElement {
    const { listingData, listingConfig, updateData } = this.props;
    const { additionalAmenities } = this.state;

    return (
      <Block className={s.amenities} title="Amenities and rules">
        <div className={s.amenities__content}>
          <div className={s.amenities__block}>
            <div className={s.amenities__title}>
              Amenities
            </div>
            <div className={s.amenities__list}>
              <Checkbox
                checked={listingData?.airConditioner}
                onClick={() =>
                  updateData({ airConditioner: !listingData?.airConditioner })}
              >
                A/C
              </Checkbox>
              <Checkbox
                checked={listingData?.porch}
                onClick={() =>
                  updateData({ porch: !listingData?.porch })}
              >
                Porch
              </Checkbox>
              <Checkbox
                checked={listingData?.balcony}
                onClick={() =>
                  updateData({ balcony: !listingData?.balcony })}
              >
                Balcony
              </Checkbox>
              <Checkbox
                checked={listingData?.deck}
                onClick={() =>
                  updateData({ deck: !listingData?.deck })}
              >
                Deck
              </Checkbox>
              <Checkbox
                checked={listingData?.furnished}
                onClick={() =>
                  updateData({ furnished: !listingData?.furnished })}
              >
                Furnished
              </Checkbox>
              <Checkbox
                checked={listingData?.hardwoodFloor}
                onClick={() =>
                  updateData({ hardwoodFloor: !listingData?.hardwoodFloor })}
              >
                Hardwood floor
              </Checkbox>
              <Checkbox
                checked={listingData?.wheelchairAccess}
                onClick={() =>
                  updateData({ wheelchairAccess: !listingData?.wheelchairAccess })}
              >
                Wheelchair access
              </Checkbox>
              <Checkbox
                checked={listingData?.garageParking}
                onClick={() =>
                  updateData({ garageParking: !listingData?.garageParking })}
              >
                Garage parking
              </Checkbox>
              <Checkbox
                checked={listingData?.offStreetParking}
                onClick={() =>
                  updateData({ offStreetParking: !listingData?.offStreetParking })}
              >
                Off-street parking
              </Checkbox>
            </div>
          </div>
          <div className={s.amenities__block}>
            <div className={s.amenities__title}>
              Laundry
            </div>
            <div className={s.amenities__list}>
              {
                listingConfig?.laundryType.map((item: IOption) => (
                  <Radio
                    key={item.key}
                    name="laundryType"
                    checked={listingData?.laundryType === item.key}
                    onChange={() =>
                      this.onChange('laundryType', item.key)}
                  >
                    {item.value}
                  </Radio>
                ))
              }
            </div>
          </div>
          <div className={s.amenities__block}>
            <div className={s.amenities__title}>
              Pets
            </div>
            <div className={s.amenities__list}>
              <Checkbox
                checked={listingData?.noPets}
                onClick={() =>
                  updateData({ noPets: !listingData?.noPets })}
              >
                No pets allowed
              </Checkbox>
              <Checkbox
                checked={listingData?.cats}
                onClick={() =>
                  updateData({ cats: !listingData?.cats })}
              >
                Cats OK
              </Checkbox>
              <Checkbox
                checked={listingData?.smallDogs}
                onClick={() =>
                  updateData({ smallDogs: !listingData?.smallDogs })}
              >
                Small dogs OK
              </Checkbox>
              <Checkbox
                checked={listingData?.largeDogs}
                onClick={() =>
                  updateData({ largeDogs: !listingData?.largeDogs })}
              >
                Large dogs OK
              </Checkbox>
              <Checkbox
                checked={listingData?.allPets}
                onClick={() =>
                  updateData({ allPets: !listingData?.allPets })}
              >
                Any other pets OK
              </Checkbox>
            </div>
          </div>
          <textarea
            value={additionalAmenities}
            placeholder="Additional amenities"
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
              this.onChange('additionalAmenities', e.currentTarget?.value)}
            //@ts-ignore
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('additionalAmenities', e.currentTarget.value)}
          />
        </div>
      </Block>
    );
  }
}
