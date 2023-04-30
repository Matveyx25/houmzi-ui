import React from 'react';
import s from './point.module.scss';

interface IProps {
  lat: number
  lng: number
}

export const Point: React.FC<IProps> = () => <div className={s.point}/>;
