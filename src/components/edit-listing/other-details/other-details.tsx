import React from 'react';
import s from './other-details.module.scss';
import { Block } from '../block/block';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Input } from '../../shared/input/input';
import { Select } from '../../shared/select/select';

interface IProps {
  listingConfig: IListingConfig
  listingData: any

  updateData(data: any): void
}

interface IState {
  mls: string
  cooling: IOption
  roof: string
  foundation: string
  internet: IOption
  flooring: string
  waterHeater: string
  heatingSystem: string
}

export class OtherDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      mls: '',
      cooling: null!,
      roof: '',
      foundation: '',
      internet: null!,
      flooring: '',
      waterHeater: '',
      heatingSystem: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { listingConfig, listingData } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        mls: listingData?.mls,
        cooling: listingConfig?.generalNumbers
          .find((item: IOption) => item.key === listingData?.cooling)!,
        roof: listingData?.roof,
        foundation: listingData?.foundation,
        internet: listingConfig?.generalBoolean
          .find((item: IOption) => item.key === listingData?.internet)!,
        flooring: listingData?.flooring,
        waterHeater: listingData?.waterHeater,
        heatingSystem: listingData?.heatingSystem,
      });
    }
  }


  onChange = (name: string, value: string) => {
    this.setState({ [name as 'mls']: value });
  };

  onBlur = (name: string, value: string) => {
    const { updateData } = this.props;

    updateData({ [name]: value });
  };

  onSelect = (name: string, option: IOption) => {
    const { updateData } = this.props;

    this.setState({ [name as 'cooling']: option });
    updateData({ [name]: option.key });
  };

  render(): React.ReactElement {
    const { listingConfig } = this.props;
    const {
      mls, cooling, roof, foundation, internet,
      flooring, waterHeater, heatingSystem,
    } = this.state;

    return (
      <Block className={s.details} title="Other details">
        <div className={s.details__content}>
          <Input
            type="number"
            value={mls}
            placeholder="MLS ID"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('mls', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('mls', e.currentTarget.value)}
          />
          <Select
            value={cooling}
            options={listingConfig?.generalNumbers}
            placeholder="Cooling"
            onSelect={(option: IOption) =>
              this.onSelect('cooling', option)}
          />
          <Input
            value={roof}
            placeholder="Roof"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('roof', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('roof', e.currentTarget.value)}
          />
          <Input
            value={foundation}
            placeholder="Foundation"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('foundation', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('foundation', e.currentTarget.value)}
          />
          <Select
            value={internet}
            options={listingConfig?.generalBoolean}
            placeholder="Internet"
            onSelect={(option: IOption) =>
              this.onSelect('internet', option)}
          />
          <Input
            value={flooring}
            placeholder="Flooring"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('flooring', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('flooring', e.currentTarget.value)}
          />
          <Input
            value={waterHeater}
            placeholder="Water heater"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('waterHeater', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('waterHeater', e.currentTarget.value)}
          />
          <Input
            value={heatingSystem}
            placeholder="Heating sys."
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('heatingSystem', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('heatingSystem', e.currentTarget.value)}
          />
        </div>
      </Block>
    );
  }
}
