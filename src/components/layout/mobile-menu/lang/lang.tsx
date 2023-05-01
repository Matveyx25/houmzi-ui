import React from 'react';
import c from 'classnames';
import s from './lang.module.scss';
import { langs } from '../../../../data/layout/langs.data';
import { ILang } from '../../../../interfaces/layout/lang.interface';
import { Button } from '../button/button';

interface IProps {
  lang: string

  changeLanguage(lang: string): void
}

export class Lang extends React.Component<IProps> {
  render(): React.ReactElement {
    const { lang, changeLanguage } = this.props;

    return (
      <Button title="Language" color="grey">
        {
          langs.map(({ text, type, fullText }: ILang) => (
            <div
              key={text}
              className={c(s.lang__item, type === lang && s.active)}
              onClick={() => changeLanguage(type)}
            >
              {fullText}
              {
                type === lang &&
                <i className={c('icon-sent-tick', s.lang__icon)}/>
              }
            </div>
          ))
        }
      </Button>
    );
  }
}
