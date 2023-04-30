import React from 'react';
import s from './details.module.scss';
import { Block } from '../block/block';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Select } from '../../shared/select/select';
import { Input } from '../../shared/input/input';

interface IProps {
  listingConfig: IListingConfig
  listingData: any

  updateData(data: any): void
}

interface IState {
  constructionType: IOption
  actionType: IOption
  condition: IOption
  propertyType: IOption
  squareFeet: string
  beds: IOption
  baths: IOption
  parking: IOption
  landArea: string
  built: string
  numberOfFloors: string
  apartmentFloor: string
  leaseTerms: string
  description: string
}

export class Details extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      constructionType: null!,
      actionType: null!,
      condition: null!,
      propertyType: null!,
      squareFeet: '',
      beds: null!,
      baths: null!,
      parking: null!,
      landArea: '',
      built: '',
      numberOfFloors: '',
      apartmentFloor: '',
      leaseTerms: '',
      description: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { listingConfig, listingData } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        constructionType: listingConfig?.constructionTypeHouse
          .concat(listingConfig?.constructionTypeFlat)
          .find((item: IOption) => item.key === listingData?.constructionType)!,
        actionType: listingConfig?.propertyAction
          .find((item: IOption) => item.key === listingData?.actionType)!,
        condition: listingConfig?.propertyCondition
          .find((item: IOption) => item.key === listingData?.condition)!,
        propertyType: listingConfig?.propertyType
          .find((item: IOption) => item.key === listingData?.propertyType)!,
        squareFeet: listingData?.squareFeet,
        beds: listingConfig?.generalNumbers
          .find((item: IOption) => item.key === listingData?.beds)!,
        baths: listingConfig?.generalNumbers
          .find((item: IOption) => item.key === listingData?.baths)!,
        parking: listingConfig?.generalNumbers
          .find((item: IOption) => item.key === listingData?.parking)!,
        landArea: listingData?.landArea,
        built: listingData?.built,
        numberOfFloors: listingData?.numberOfFloors,
        apartmentFloor: listingData?.apartmentFloor,
        leaseTerms: listingData?.leaseTerms,
        description: listingData?.description,
      });
    }
  }

  onChange = (name: string, value: string) => {
    this.setState({ [name as 'squareFeet']: value });
  };

  onBlur = (name: string, value: string) => {
    const { updateData } = this.props;

    updateData({ [name]: value });
  };

  onSelect = (name: string, option: IOption) => {
    const { updateData, listingConfig } = this.props;

    this.setState({ [name as 'actionType']: option });

    updateData({ [name]: option.key });

    if (name === 'propertyType') {
      updateData({
        constructionType:
        listingConfig?.[
          option.key === 'flat'
            ? 'constructionTypeFlat'
            : 'constructionTypeHouse'
          ][0].key,
      });
    }
  };

  render(): React.ReactElement {
    const { listingConfig, listingData } = this.props;
    const {
      constructionType, actionType, condition, propertyType,
      squareFeet, beds, baths, parking, landArea, built,
      numberOfFloors, apartmentFloor, leaseTerms, description,
    } = this.state;

    return (
      <Block className={s.details} title="Detail and description">
        <div className={s.details__content}>
          <Select
            options={listingData?.propertyType === 'flat'
              ? listingConfig?.constructionTypeFlat
              : listingConfig?.constructionTypeHouse
            }
            value={constructionType}
            placeholder="Construction type"
            onSelect={(option: IOption) =>
              this.onSelect('constructionType', option)}
          />
          <Select
            options={listingConfig?.propertyAction}
            value={actionType}
            placeholder="Action type"
            onSelect={(option: IOption) =>
              this.onSelect('actionType', option)}
          />
          <Select
            options={listingConfig?.propertyCondition}
            value={condition}
            placeholder="Property condition"
            onSelect={(option: IOption) =>
              this.onSelect('condition', option)}
          />
          <Select
            options={listingConfig?.propertyType}
            value={propertyType}
            placeholder="Property type"
            onSelect={(option: IOption) =>
              this.onSelect('propertyType', option)}
          />
          <Input
            type="number"
            value={squareFeet}
            placeholder="Square feet"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('squareFeet', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('squareFeet', e.currentTarget.value)}
          />
          <Select
            options={listingConfig?.generalNumbers}
            value={beds}
            placeholder="Beds"
            onSelect={(option: IOption) =>
              this.onSelect('beds', option)}
          />
          <Select
            options={listingConfig?.generalNumbers}
            value={baths}
            placeholder="Baths"
            onSelect={(option: IOption) =>
              this.onSelect('baths', option)}
          />
          <Select
            options={listingConfig?.generalNumbers}
            value={parking}
            placeholder="Parking"
            onSelect={(option: IOption) =>
              this.onSelect('parking', option)}
          />
          <Input
            type="number"
            value={landArea}
            placeholder="Land area"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('landArea', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('landArea', e.currentTarget.value)}
          />
          <Input
            value={built}
            placeholder="Built"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('built', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('built', e.currentTarget.value)}
          />
          <Input
            value={numberOfFloors}
            placeholder="Number of floors"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('numberOfFloors', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('numberOfFloors', e.currentTarget.value)}
          />
          <Input
            value={apartmentFloor}
            placeholder="Apartment floor"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('apartmentFloor', e.currentTarget?.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('apartmentFloor', e.currentTarget.value)}
          />
          <div className={s.details__wrap}>
            <textarea
              value={leaseTerms}
              placeholder="Lease terms"
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                this.onChange('leaseTerms', e.currentTarget?.value)}
              //@ts-ignore
              onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                this.onBlur('leaseTerms', e.currentTarget.value)}
            />
            <textarea
              value={description}
              placeholder="Description"
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                this.onChange('description', e.currentTarget?.value)}
              //@ts-ignore
              onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                this.onBlur('description', e.currentTarget.value)}
            />
          </div>
        </div>
      </Block>
    );
  }
}
