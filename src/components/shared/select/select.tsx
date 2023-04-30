import React, { RefObject } from 'react';
import c from 'classnames/bind';
import s from './select.module.scss';
import { IOption } from '../../../interfaces/shared/option.interface';

interface IProps {
  options: IOption[]
  value: IOption
  placeholder: string
  className?: string

  onSelect(option: IOption): void
}

interface IState {
  isOpen: boolean
  selectRef: RefObject<HTMLDivElement>
}

export class Select extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
      selectRef: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { value } = this.props;

    if (value?.value !== prevProps.value?.value) {
      this.setState({ isOpen: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: any) => {
    const { selectRef } = this.state;

    if (selectRef.current && !selectRef.current.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  render(): React.ReactElement {
    const { options, value, placeholder, className, onSelect } = this.props;
    const { isOpen, selectRef } = this.state;

    return (
      <div className={c(s.select__wrap, className)} ref={selectRef}>
        <div
          className={c(
            s.select,
            !value && s.select_placeholder,
            isOpen && s.select_focus,
          )}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          {
            value ? value.value : placeholder
          }
          <i className={c(
            'icon-arrow',
            s.select__icon,
            isOpen && s.active,
          )}/>
        </div>
        {
          isOpen &&
          <div className={s.select__dropdown}>
            {
              options.map((option: IOption) => (
                <div
                  key={option.key}
                  className={s.select__option}
                  onClick={() => onSelect(option)}
                >
                  {option.value}
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}
