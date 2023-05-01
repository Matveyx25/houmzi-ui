import React from 'react';
import s from './action-types.module.scss';
import c from 'classnames';
import { actionTypes } from '../../../data/buy/actionTypes.data';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Radio } from '../../shared/radio/radio';

interface IProps {
  actionType: string

  selectOption(name: string, value: string): void
}

export const ActionTypes : React.FC<IProps> = ({ actionType, selectOption }) => (
  <>
    <Radio
      name="offerType"
      checked={!actionType}
      onChange={() => selectOption('actionType', '')}
    >
      Any
    </Radio>
    {
      actionTypes.map(({ value, key }: IOption) => (
        <Radio
          key={key}
          name="offerType"
          checked={key === actionType}
          onChange={() => selectOption('actionType', key)}
        >
          <div className={s.wrap}>
            <span className={c(
              s.indicator,
              key === 'sell' && s.indicator_orange,
              key === 'rent' && s.indicator_blue,
            )}/>
            {value}
          </div>
        </Radio>
      ))
    }
  </>
)
