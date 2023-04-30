import React from 'react';
import s from './contacts.module.scss';
import { Block } from '../block/block';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';
import { Input } from '../../shared/input/input';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Radio } from '../../shared/radio/radio';

interface IProps {
  listingConfig: IListingConfig
  listingData: any

  updateData(data: any): void
}

interface IState {
  contactName: string
  contactEmail: string
  contactPhone: string
  rentByType: string
}

export class Contacts extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      rentByType: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { listingData } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        contactName: listingData?.contactName,
        contactEmail: listingData?.contactEmail,
        contactPhone: listingData?.contactPhone,
        rentByType: listingData?.rentByType,
      });
    }
  }

  onChange = (name: string, value: string) => {
    const { updateData } = this.props;

    this.setState({ [name as 'contactName']: value });

    if (name === 'rentByType') {
      updateData({ [name]: value });
    }
  };

  onBlur = (name: string, value: string) => {
    const { updateData } = this.props;

    updateData({ [name]: value });
  };

  render(): React.ReactElement {
    const { listingConfig, listingData, updateData } = this.props;
    const { contactName, contactEmail, contactPhone, rentByType } = this.state;

    return (
      <Block className={s.price} title="Contact information">
        <div className={s.contacts__content}>
          <Input
            value={contactName}
            placeholder="Name"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('contactName', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('contactName', e.currentTarget.value)}
          />
          <Input
            value={contactEmail}
            placeholder="Email"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('contactEmail', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('contactEmail', e.currentTarget.value)}
          />
          <Input
            value={contactPhone}
            placeholder="Phone"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('contactPhone', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('contactPhone', e.currentTarget.value)}
          />
          <Checkbox
            className={s.contacts__checkbox}
            checked={listingData?.hidePhone}
            onClick={() =>
              updateData({ hidePhone: !listingData?.hidePhone })}
          >
            Hide phone on listing
          </Checkbox>
        </div>
        <div className={s.contacts__role}>
          <div className={s.contacts__roleTitle}>
            For rent by
          </div>
          <div className={s.contacts__roleContent}>
            {
              listingConfig?.rentByType.map((item: IOption) => (
                <Radio
                  key={item.key}
                  name="rentByType"
                  checked={rentByType === item.key}
                  onChange={() =>
                    this.onChange('rentByType', item.key)}
                >
                  {item.value}
                </Radio>
              ))
            }
          </div>
        </div>
      </Block>
    );
  }
}
