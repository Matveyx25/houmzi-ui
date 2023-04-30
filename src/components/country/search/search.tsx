import React, { ChangeEvent } from 'react';
import s from './search.module.scss';
import c from 'classnames/bind';
import { Block } from '../index';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { countriesData } from '../../../data/layout/countries.data';

interface IProps extends WithRouterProps {
  country: string
  type: string
}

interface IState {
  country: string
  isOpened: boolean
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      country: props.country,
      isOpened: false,
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      country: e.currentTarget.value,
      isOpened: true,
    });
  };

  getCountries = (): string[] => {
    const { country } = this.state;

    return countriesData.filter((c: string) =>
      c.toLowerCase().includes(country.toLowerCase()));
  };

  onSelect = (country: string) => {
    const { type } = this.props;

    this.setState({ country, isOpened: false });
    this.props.router.push(`/${country}/${type}`, undefined, { shallow: false });
  };

  render(): React.ReactElement {
    const { country, isOpened } = this.state;

    return (
      <Block>
        <div className={s.search}>
          <div className={s.search__wrap}>
            <div className={s.search__icon}>
              <i className="icon-search"/>
            </div>
            <input
              className={s.search__input}
              value={country}
              onChange={this.onChange}
            />
            <ul className={c(s.search__dropdown, isOpened && s.show)}>
              {
                this.getCountries().length
                  ? this.getCountries().map((country: string) => (
                    <li key={country} onClick={() => this.onSelect(country)}>
                      {country}
                    </li>
                  ))
                  : <li className={s.disabled}>
                    No matches
                  </li>
              }
            </ul>
          </div>
          <Link href="/homes">
            <button className={s.search__btn}>
              <i className="icon-pin"/>
              Go to map
            </button>
          </Link>
        </div>
      </Block>
    );
  }
}

export default withRouter(Search);
