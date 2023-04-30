import React from 'react';
import c from 'classnames/bind';
import s from './add-review.module.scss';
import { Button } from '../../shared/button/button';

interface IProps {
  onAddReview(rate: number, text: string): void
}

interface IState {
  rate: number
  text: string
}

export class AddReviewComponent extends React.Component<IProps, IState> {
  stars = [1, 2, 3, 4, 5];

  constructor(props: IProps) {
    super(props);

    this.state = { rate: 0, text: '' };
  }

  onChange = (e: React.FormEvent<HTMLTextAreaElement>) => this.setState({ text: e.currentTarget.value });

  onAddReview = () => {
    const { onAddReview } = this.props;
    const { rate, text } = this.state;

    onAddReview(rate, text);
  };

  render(): React.ReactElement {
    const { rate, text } = this.state;

    return (
      <div className={s.addReview}>
        <div className={s.addReview__desc}>
          Leave the most detailed feedback and
          <br/>
          rating to the agent/company
        </div>
        <div className={s.addReview__rate}>
          {
            this.stars.map((item: number) => (
              <i
                key={item}
                className={c(
                  'icon-star2',
                  s.addReview__star,
                  item <= rate && s.active,
                )}
                onClick={() => this.setState({ rate: item })}
              />
            ))
          }
        </div>
        <textarea
          className={s.addReview__textarea}
          placeholder="Text..."
          value={text}
          onChange={this.onChange}
        />
        <Button
          color="blue"
          disabled={!(rate && text.trim())}
          className={s.addReview__btn}
          onClick={this.onAddReview}
        >
          Add
        </Button>
      </div>
    );
  }
}
