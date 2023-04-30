import React from 'react';
import s from './banner.module.scss';
import { Button } from '../../shared/button/button';

interface IState {
  search: string
}

export class Banner extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = { search: '' };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: search } = e.currentTarget;

    this.setState({ search });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { search } = this.state;

    console.log(search);
    e.preventDefault();
  };

  render(): React.ReactElement {
    const { search } = this.state;

    return (
      <div className={s.banner}>
        <h1 className={s.banner__title}>
          Hello, how can we help?
        </h1>
        <form className={s.banner__form} onSubmit={this.onSubmit}>
          <div className={s.banner__inputWrap}>
            <i className="icon-search"/>
            <input
              type="text"
              value={search}
              placeholder="Ask a question"
              className={s.banner__input}
              onChange={this.onChange}
            />
          </div>
          <Button color="blue" className={s.banner__btn}>Search</Button>
        </form>
        <div className={s.banner__desc}>
          or choose a category to quickly find the help you need
        </div>
      </div>
    );
  }
}
