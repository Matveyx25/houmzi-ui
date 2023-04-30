import React from 'react';
import s from './price.module.scss';
import { Block } from '../block/block';
import { Input } from '../../shared/input/input';
import { Checkbox } from '../../shared/checkbox/checkbox';

interface IProps {
  listingData: any

  updateData(data: any): void
}

interface IState {
  price: string
  securityDeposit: string
  leaseDuration: string
}

export class Price extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      price: '',
      securityDeposit: '',
      leaseDuration: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { listingData } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        price: listingData?.price,
        securityDeposit: listingData?.securityDeposit,
        leaseDuration: listingData?.leaseDuration,
      });
    }
  }

  onChange = (name: string, value: string) => {
    this.setState({ [name as 'price']: value });
  };

  onBlur = (name: string, value: string | Date) => {
    const { updateData } = this.props;

    if (name === 'dateAvailable') {
      updateData({ [name]: new Date(value).toISOString() });
      return;
    }

    updateData({ [name]: value });
  };

  render(): React.ReactElement {
    const { listingData, updateData } = this.props;
    const { price, securityDeposit, leaseDuration } = this.state;

    return (
      <Block className={s.price} title="Price and duration">
        <div className={s.price__content}>
          <Input
            type="number"
            value={price}
            placeholder="Price"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('price', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('price', e.currentTarget.value)}
          >
            {listingData?.actionType === 'rent' ? '$/mo' : ''}
          </Input>
          <Input
            type="number"
            value={securityDeposit}
            placeholder="Security deposit"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('securityDeposit', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('securityDeposit', e.currentTarget.value)}
          />
          <Input
            type="number"
            value={leaseDuration}
            placeholder="Lease duration"
            isHideError
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.onChange('leaseDuration', e.currentTarget.value)}
            onBlur={(e: React.FormEvent<HTMLInputElement>) =>
              this.onBlur('leaseDuration', e.currentTarget.value)}
          />
          <Checkbox
            checked={listingData?.oneMonthRent}
            onClick={() =>
              updateData({ oneMonthRent: !listingData?.oneMonthRent })}
          >
            Set to one month’s rent
          </Checkbox>
        </div>
      </Block>
    );
  }
}
