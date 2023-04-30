import React from 'react';
import c from 'classnames/bind';
import s from './address.module.scss';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { GoogleMap } from '../../shared/google-map/google-map';

interface IProps {
  address: string
  hideAddress: boolean
  lat: number
  lng: number

  updateData(data: any): void
}

export const Address: React.FC<IProps> = ({ address, hideAddress, lat, lng, updateData }) => {
  let street: string = '';
  let city: string = '';

  address?.split(',').map((string: string, i: number, array: string[]) => {
    if (array.length === 1) {
      street = array.join('');
    } else if (i < array.length - 2 && s) {
      street += street ? `, ${string}` : string;
    } else {
      city += city ? `, ${string}` : string;
    }
  });

  return (
    <div className={s.address}>
      <GoogleMap className={s.address__map} center={{ lat, lng }} point zoom={14}/>
      <div className={s.address__wrap}>
        <div className={s.address__addressWrap}>
          <div className={s.address__text}>
            <div className={s.address__street}>
              {street}
              <i className={c('icon-edit', s.address__icon)}/>
            </div>
            <div className={s.address__city}>
              {city}
            </div>
          </div>
        </div>
        <Checkbox
          className={s.address__hide}
          checked={hideAddress}
          onClick={() => updateData({ hideAddress: !hideAddress })}
        >
          Hide property address on listing
        </Checkbox>
      </div>
    </div>
  );
};
