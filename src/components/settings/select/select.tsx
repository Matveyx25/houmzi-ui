import React, { RefObject } from 'react';
import { ICountriesAndPhones } from '../../../data/countries-and-phones';
import c from 'classnames/bind';
import s from '../../shared/select/select.module.scss';

interface IProps {
  value: ICountriesAndPhones
  options: ICountriesAndPhones[]
  placeholder: string
  className?: string

  onSelect(option: ICountriesAndPhones): void
}

interface IState {
  isOpened: boolean
  selectRef: RefObject<HTMLDivElement>
}

export class Select extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpened: false,
      selectRef: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { value } = this.props;

    if (value?.name !== prevProps.value?.name) {
      this.setState({ isOpened: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: any) => {
    const { selectRef } = this.state;

    if (selectRef.current && !selectRef.current.contains(e.target)) {
      this.setState({ isOpened: false });
    }
  };

  render(): React.ReactElement {
    const { options, value, placeholder, className, onSelect } = this.props;
    const { isOpened, selectRef } = this.state;

    return (
      <div className={c(s.select__wrap, className)} ref={selectRef}>
        <div
          className={c(
            s.select,
            !value && s.select_placeholder,
            isOpened && s.select_focus,
          )}
          onClick={() => this.setState({ isOpened: !isOpened })}
        >
          {
            value
              ? <>
                {value.name}
                <span>{value.phone}</span>
              </>
              : placeholder
          }
          <i className={c(
            'icon-arrow',
            s.select__icon,
            isOpened && s.active,
          )}/>
        </div>
        {
          isOpened &&
          <div className={s.select__dropdown}>
            {
              options.map((option: ICountriesAndPhones) => (
                <div
                  key={option.name}
                  className={s.select__option}
                  onClick={() => onSelect(option)}
                >
                  {option.name}
                  <span>{option.phone}</span>
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}
