import React from 'react';
import s from './filters.module.scss';
import c from 'classnames';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { LayoutContext } from '../../../contexts/layout.context';

interface IProps {
  activeFilter: string

  changeFilter(filter: string): void
}

class Filters extends React.Component<IProps> {
  static contextType = LayoutContext;
  filters: string[] = ['All', 'Property', 'People', 'Articles'];
  swiperConfig: ReactIdSwiperProps = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    containerClass: s.filters__swiper,
  };

  render(): React.ReactElement {
    const { activeFilter, changeFilter } = this.props;
    const { windowWidth } = this.context;

    return (
      <div className={s.filters}>
        {
          windowWidth >= 768
            ? this.filters.map((item: string) => (
              <div
                key={item}
                className={c(s.filters__item, activeFilter === item && s.active)}
                onClick={() => changeFilter(item)}
              >
                {item}
              </div>
            ))
            : <Swiper {...this.swiperConfig}>
              {
                this.filters.map((item: string) => (
                  <div
                    key={item}
                    className={c(s.filters__item, activeFilter === item && s.active)}
                    onClick={() => changeFilter(item)}
                  >
                    {item}
                  </div>
                ))
              }
            </Swiper>
        }
      </div>
    );
  }
}

export default Filters;
