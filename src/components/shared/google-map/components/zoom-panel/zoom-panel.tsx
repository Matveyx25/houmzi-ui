import React from 'react';
import s from './zoom-panel.module.scss';
import { Button } from '../../../button/button';

interface IProps {
  show: boolean

  onZoomChanged(value: 'inc' | 'dec'): void
}

const buttons = ['+', '-'];

export const ZoomPanel: React.FC<IProps> = ({ show, onZoomChanged }) =>
  show
    ? <div className={s.zoom}>
      {
        buttons.map((button: string) => (
          <Button
            key={button}
            className={s.zoom__btn}
            color="blueLight"
            onClick={() => onZoomChanged(button === '+' ? 'inc' : 'dec')}
          >
            {button}
          </Button>
        ))
      }
    </div>
    : null;
