import React from 'react';
import s from './card.module.scss';
import { Button } from '../../shared/button/button';
import { ITariff } from '../../../interfaces/subscriptions/tariff.interface';

interface IProps {
  tariff: ITariff

  changeTariff(id: number): void
}

export const Card: React.FC<IProps> = ({ tariff }) => (
  <div className={s.card}>
    {
      tariff.isPopular &&
      <div className={s.card__label}>
        Popular
      </div>
    }
    <img src={tariff?.img} alt="" className={s.card__img}/>
    <h3 className={s.card__title}>
      {tariff?.title}
    </h3>
    <span className={s.card__desc}>
      {tariff?.desc}
    </span>
    <span className={s.card__price}>
      {tariff?.price}
    </span>
    <ul className={s.card__options}>
      {
        tariff.options.map((option: string) => (
          <li key={option}>{option}</li>
        ))
      }
    </ul>
    <Button color="blue" className={s.card__btn}>
      Upgrade
    </Button>
  </div>
);
