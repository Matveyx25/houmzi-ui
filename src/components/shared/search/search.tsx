import React from 'react';
import s from './search.module.scss';
import c from 'classnames/bind';

interface IProps {
  value: string
  placeholder: string
  options?: any[]

  onChange(value: string): void
}

interface IState {
  isOpened: boolean
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this.onChange = this.onChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props;

    onChange(e.currentTarget.value);
  }

  getOptions(): React.ReactElement[] {
    const { value, options, onChange } = this.props;

    return options
      .filter((item: string) =>
        item.toLowerCase().includes(value.toLowerCase()))
      .map((item: string) => (
        <li key={item} onClick={() => onChange(item)}>
          {item}
        </li>
      ));
  }

  render(): React.ReactElement {
    const { value, placeholder, options } = this.props;
    const { isOpened } = this.state;

    return (
      <div className={s.search}>
        <div className={s.search__icon}>
          <i className="icon-search"/>
        </div>
        <input
          className={s.search__input}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {
          options?.length &&
          <ul className={c(s.search__dropdown, isOpened && s.show)}>
            {
              this.getOptions().length
                ? this.getOptions()
                : <li className={s.disabled}>
                  No matches
                </li>
            }
          </ul>
        }
      </div>
    );
  }
}

export default Search;
