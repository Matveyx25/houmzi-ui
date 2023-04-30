import React, { useContext } from 'react';
import s from './params.module.scss';
import { Block } from '../index';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { params } from '../../../mocks/country/params';
import { LayoutContext } from '../../../contexts/layout.context';

const swiperConfig: ReactIdSwiperProps = {
  slidesPerView: 'auto',
  spaceBetween: 20,
  containerClass: s.swiper__container,
};

export const Params: React.FC = () => {
  const { windowWidth } = useContext(LayoutContext);

  const renderParams = (): React.ReactElement[] => (
    params.map(({ label, value }) => (
      <div key={label} className={s.param__wrap}>
        <div className={s.param}>
          <div className={s.param__label}>
            {label}
          </div>
          <div className={s.param__value}>
            {value}
          </div>
        </div>
      </div>
    ))
  );

  return (
    <Block>
      {
        windowWidth >= 1200
          ? <div className={s.params}>{renderParams()}</div>
          : <Swiper {...swiperConfig}>{renderParams()}</Swiper>
      }
    </Block>
  );
};
