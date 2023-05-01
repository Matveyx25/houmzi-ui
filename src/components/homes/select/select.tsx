import React from 'react';
import s from './select.module.scss';
import c from 'classnames';
import { Button } from '../../shared/button/button';

interface IProps {
  placeholder?: string
  value: string
  hidden?: boolean
}

interface IState {
  openedDropdown: boolean
  selectRef: React.RefObject<HTMLDivElement>
}

export class Select extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      openedDropdown: false,
      selectRef: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: any) => {
    const { selectRef } = this.state;

    if (selectRef.current && !selectRef.current.contains(e.target)) {
      this.setState({ openedDropdown: false });
    }
  };

  onSwitchOpen = () => {
    const { openedDropdown } = this.state;

    this.setState({ openedDropdown: !openedDropdown });
  };

  render(): React.ReactElement {
    const { placeholder, value, hidden, children } = this.props;
    const { openedDropdown, selectRef } = this.state;

    return !hidden &&
      <div className={s.select} ref={selectRef}>
        <div
          className={c(
            s.select__input,
            openedDropdown && s.focused,
            value && s.selected,
          )}
          onClick={this.onSwitchOpen}
        >
          {
            value?.trim().length
              ? <span className={s.select__value}>{value}</span>
              : <span className={s.select__placeholder}>{placeholder}</span>
          }
          <i className={c(s.select__arrows, 'icon-arrows')}/>
        </div>
        <div className={c(s.select__dropdown, openedDropdown && s.show)}>
          {children}
          <Button className={s.select__btn} color="blue" full onClick={this.onSwitchOpen}>
            Done
          </Button>
        </div>
      </div>;
  }
}
