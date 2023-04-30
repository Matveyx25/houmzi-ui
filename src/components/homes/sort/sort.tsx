import React from 'react';
import s from './sort.module.scss';
import c from 'classnames/bind';
import { IOption } from '../../../interfaces/shared/option.interface';

interface IProps {
  setSort(sortField: string | undefined, direction: number | undefined): void

  removeSort(): void
}

interface IState {
  price: string
  squareFeet: string
  date: string
}

export class Sort extends React.Component<IProps, IState> {
  sortList: IOption[] = [
    {
      value: 'price',
      key: 'price',
    },
    {
      value: 'square',
      key: 'squareFeet',
    },
    {
      value: 'newest',
      key: 'date',
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      price: null!,
      squareFeet: null!,
      date: null!,
    };
  }

  changeSort = (key: string) => {
    const { setSort, removeSort } = this.props;

    this.setState({
      price: null!,
      squareFeet: null!,
      date: null!,
    });

    switch (this.state[key as 'price' || 'area' || 'date']) {
      case 'asc':
        this.setState({ [key as 'price']: 'desc' });
        setSort(key, -1);
        break;
      case 'desc':
        removeSort();
        break;
      default:
        this.setState({ [key as 'price']: 'asc' });
        setSort(key, 1);
    }
  };

  render(): React.ReactElement {
    return (
      <div className={s.sort}>
        {
          this.sortList.map((item: IOption) => (
            <div
              key={item.key}
              className={s.sort__item}
              onClick={() => this.changeSort(item.key)}
            >
              {item.value}
              <div className={s.sort__arrows}>
                <i
                  className={c(
                    s.sort__arrow,
                    this.state[item.key as 'price' || 'area' || 'date'] === 'asc' && s.active,
                    'icon-arrow-min',
                  )}
                />
                <i
                  className={c(
                    s.sort__arrow,
                    s.sort__arrow_down,
                    this.state[item.key as 'price' || 'area' || 'date'] === 'desc' && s.active,
                    'icon-arrow-min',
                  )}
                />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
