import React from 'react';
import s from './search.module.scss';
import Search from '../../src/components/shared/search/search';
import Content from '../../src/components/search/content/content';
import { Layout } from '../../src/containers/layout/layout-container';

interface IState {
  search: string
  activeFilter: string
}

export default class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      search: '',
      activeFilter: 'All',
    };
  }

  render(): React.ReactElement {
    const { search } = this.state;

    return (
      <Layout title="Search on site">
        <section className={s.search__wrap}>
          <div className={s.search}>
            <Search
              value={search}
              placeholder="Search on site"
              onChange={(search: string) => this.setState({ search })}
            />
          </div>
          <Content
            {...this.state}
            changeFilter={(filter: string) => this.setState({ activeFilter: filter })}
          />
        </section>
      </Layout>
    );
  }
}
