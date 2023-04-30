import React from 'react';
import s from './rental.module.scss';
import { Block } from '../block/block';
import { Switch } from '../../shared/switch/switch';
import { Button } from '../../shared/button/button';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends WithRouterProps {
  listingData: any

  updateData(data: any): void
}

interface IState {
  allowToApplyFromListings: boolean
}

class Rental extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { allowToApplyFromListings: false };
  }

  updateData = (isDraft: boolean) => {
    this.props.updateData({ isDraft });
  };

  publishListing = () => {
    this.updateData(false);
    this.props.router.push('/dashboard/my-listings');
  };

  saveAsDraft = () => {
    this.updateData(true);
    this.props.router.push('/dashboard/my-listings/drafts');
  };

  render(): React.ReactElement {
    const { listingData, updateData } = this.props;

    return (
      <Block className={s.rental} title="Rental applications">
        <div className={s.rental__allow}>
          <span className={s.rental__text}>
            Allow renters to apply for this and all active properties directly from the listings
          </span>
          <Switch
            checked={listingData?.allowToApplyFromListings}
            onChange={() =>
              updateData({ allowToApplyFromListings: !listingData?.allowToApplyFromListings })}/>
        </div>
        <div className={s.rental__text}>
          By enabling applications, you agree to comply with our
          <a href="/#" className={s.rental__link}> Terms of Use</a>,
          <a href="/#" className={s.rental__link}> Rental User Terms </a>
          and
          <a href="/#" className={s.rental__link}> Respectful Renting Pledge</a>.
        </div>
        <div className={s.rental__wrap}>
          <div className={s.rental__title}>
            Activate your listing today!
          </div>
          <div className={s.rental__text}>
            By clicking Publish listing, you agree to comply with our
            <a href="/#" className={s.rental__link}> Terms of Use</a>,
            <a href="/#" className={s.rental__link}> Rental User Terms </a>
            and
            <a href="/#" className={s.rental__link}> Respectful Renting Pledge</a>.
          </div>
          <div className={s.rental__actions}>
            <Button color="blue" onClick={this.publishListing}>
              Publish listing
            </Button>
            <Button color="blueBorder" onClick={this.saveAsDraft}>
              Save as draft
            </Button>
          </div>
        </div>
      </Block>
    );
  }
}

export default withRouter(Rental);
