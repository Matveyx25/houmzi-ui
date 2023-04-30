import React from 'react';
import s from './map-button.module.scss';
import { Button } from '../../../button/button';
import { RadioGroup } from '../../../radio-group/radio-group';
import { IOption } from '../../../../../interfaces/shared/option.interface';

interface IProps {
  show: boolean
  mapType: 'satellite' | 'roadmap'

  changeMapType(mapType: 'satellite' | 'roadmap'): void
}

interface IState {
  openedDropdown: boolean
}

const mapTypes: IOption[] = [
  {
    key: 'satellite',
    value: 'Satellite',
  }, {
    key: 'roadmap',
    value: 'Street',
  },
];

export class MapButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { openedDropdown: false };
  }

  render() {
    const { show, mapType, changeMapType } = this.props;
    const { openedDropdown } = this.state;

    return show
      ? (
        <div className={s.wrap}>
          <Button color="blueLight" className={s.btn}
                  onClick={() => this.setState({ openedDropdown: !openedDropdown })}>
            Map
            <i className="icon-arrow-min"/>
          </Button>
          {
            openedDropdown &&
            <div className={s.dropdown}>
              <RadioGroup
                name="mapType"
                value={mapType}
                options={mapTypes}
                selectOption={(name, value: 'satellite' | 'roadmap') => changeMapType(value)}
              />
            </div>
          }
        </div>
      )
      : null;
  }
}
