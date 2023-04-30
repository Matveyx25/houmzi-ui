import React from 'react';
import { IOption } from '../../../interfaces/shared/option.interface';
import { Radio } from '../radio/radio';

interface IProps {
  name: string
  value: string
  options: IOption[]

  selectOption(name: string, value: string): void
}

export const RadioGroup: React.FC<IProps> = ({ name, value, options, selectOption }) =>
  options
    ? <>
      {
        options?.map((option: IOption) => (
          <Radio
            name={name}
            key={option.key}
            checked={value === option.key}
            onChange={() => selectOption(name, option.key)}
          >
            {option.value}
          </Radio>
        ))
      }
    </>
    : null;
