import React from 'react';
import s from './content.module.scss';
import Block from '../block/block';
import ListingCard from '../listing-card/listing-card';
import PeopleCard from '../people-card/people-card';
import ArticleCard from '../article-card/article-card';
import CardWrap from '../card-wrap/card-wrap';
import Filters from '../filters/filters';

interface IProps {
  search: string
  activeFilter: string

  changeFilter(filter: string): void
}

class Content extends React.Component<IProps> {
  render(): React.ReactElement {
    const { search, ...props } = this.props;
    const { activeFilter } = props;

    return (
      <div className={s.content}>
        <Filters {...props}/>
        {
          (activeFilter === 'All' || activeFilter === 'Property') &&
          <Block title={search ? 'Property' : 'Popular property'}>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
            <CardWrap>
              <ListingCard/>
            </CardWrap>
          </Block>
        }
        {
          (activeFilter === 'All' || activeFilter === 'People') &&
          <Block title={search ? 'People' : 'Popular people'}>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
            <CardWrap>
              <PeopleCard/>
            </CardWrap>
          </Block>
        }
        {
          (activeFilter === 'All' || activeFilter === 'Articles') &&
          <Block title={search ? 'Articles' : 'Popular articles'}>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
            <CardWrap>
              <ArticleCard/>
            </CardWrap>
          </Block>
        }
      </div>
    );
  }
}

export default Content;
