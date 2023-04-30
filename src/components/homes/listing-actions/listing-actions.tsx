import React from 'react';
import s from './listing-actions.module.scss';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { ShareButton } from '../../shared/share-button/share-button';

interface IProps extends WithRouterProps {
  isFavorite: boolean

  addFavorite(): void

  removeFavorite(): void
}

interface IState {
  isFavorite: boolean
}

class ListingActions extends React.Component<IProps, IState> {
  items: string[] = ['icon-heart-line', 'icon-share', 'icon-more'];

  constructor(props: IProps) {
    super(props);

    this.state = { isFavorite: false };
  }

  componentDidMount() {
    const { isFavorite } = this.props;

    this.setState({ isFavorite });
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (this.props.isFavorite !== prevProps.isFavorite) {
      const { isFavorite } = this.props;

      this.setState({ isFavorite });
    }
  }

  changeFavorite = () => {
    const { addFavorite, removeFavorite } = this.props;
    const { isFavorite } = this.state;

    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }

    this.setState({ isFavorite: !isFavorite });
  };

  render(): React.ReactElement {
    const { isFavorite } = this.state;

    return (
      <div className={s.actions}>
        <div className={s.actions__item}>
          <i
            className={isFavorite ? 'icon-heart-full' : 'icon-heart-line'}
            onClick={this.changeFavorite}
          />
        </div>
        <ShareButton link={window.location.href} classNames={s.actions__item} btnClass={s.btn}/>
        <div className={s.actions__item}>
          <i className="icon-more"/>
        </div>
      </div>
    );
  }
}

export default withRouter(ListingActions);
