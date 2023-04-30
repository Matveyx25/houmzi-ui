import React, { useContext } from 'react';
import s from './list.module.scss';
import c from 'classnames/bind';
import { Card } from '../card/card';
import { ITariff } from '../../../interfaces/subscriptions/tariff.interface';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { LayoutContext } from '../../../contexts/layout.context';
import { Button } from '../../shared/button/button';

interface IProps {
  tariffs: ITariff[]

  changeTariff(id: number): void
}

const swiperConfig: ReactIdSwiperProps = {
  slidesPerView: 1,
  containerClass: s.swiper,
  wrapperClass: s.swiper__wrap,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: s.pagination__item,
    bulletActiveClass: s.active,
    clickableClass: s.pagination,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: s.disabled,
  },
  renderPrevButton: () => (
    <Button color="blue" className={c(s.navigation__item, s.navigation__item_prev, 'swiper-button-prev')}>
      <i className="icon-arrow"/>
    </Button>
  ),
  renderNextButton: () => (
    <Button color="blue" className={c(s.navigation__item, s.navigation__item_next, 'swiper-button-next')}>
      <i className="icon-arrow"/>
    </Button>
  ),
};

export const List: React.FC<IProps> = ({ tariffs, changeTariff }) => {
  const { windowWidth } = useContext(LayoutContext);

  const renderTariffs = () => tariffs.map((tariff: ITariff) => (
    <div key={tariff.id} className={s.swiper__item}>
      <Card tariff={tariff} changeTariff={changeTariff}/>
    </div>
  ));

  return (
    <div className={s.container}>
      <h1 className={s.title}>
        Choose the best plan for your business
      </h1>
      {
        windowWidth < 1200
          ? <Swiper {...swiperConfig}>{renderTariffs()}</Swiper>
          : <div className={s.wrap}>{renderTariffs()}</div>
      }
    </div>
  );
};
