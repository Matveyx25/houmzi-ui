import React from 'react';
import s from './cities.module.scss';
import { Block } from '../index';
import { ICity } from '../../../interfaces/saved-homes/city.interface';
import { City } from '../city/city';

interface IProps {
  country: string
  cities: ICity[]
}

export const Cities: React.FC<IProps> = ({ country, cities }) => (
  <Block title={`Popular cities in ${country}`}>
    <div className={s.cities}>
      {
        cities?.map((city: ICity) => (
          <City key={city.name} {...city}/>
        ))
      }
    </div>
  </Block>
);
