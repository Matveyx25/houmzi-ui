import React from 'react';
import s from './timer.module.scss';

interface IState {
  timer: string
  isActive: boolean
  interval: any
}

export class Timer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      timer: '',
      isActive: true,
      interval: null,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    const { interval } = this.state;

    clearInterval(interval);
  }

  timer = () => {
    let count: number = 70;

    this.setState({ timer: this.createTimerString(count) });

    const interval = setInterval(
      () => {
        count--;

        if (count === 0) {
          clearInterval(interval);
          this.setState({ isActive: false });
        }

        this.setState({ timer: this.createTimerString(count) });
      },
      1000);
    this.setState({ interval });
  };

  createTimerString = (count: number): string => {
    if (count / 60 >= 1) {
      const m: number = +(count / 60).toFixed();
      const s: number = count - m * 60;

      return `${this.checkTwoNumbers(m)}:${this.checkTwoNumbers(s)}`;
    } else {
      return `00:${this.checkTwoNumbers(count)}`;
    }
  };

  checkTwoNumbers = (number: number): string => {
    return number.toString().length === 2
      ? number.toString()
      : `0${number}`;
  };

  onSendAgain = () => {
    this.timer();
    this.setState({ isActive: true });
  };

  render(): React.ReactElement {
    const { timer, isActive } = this.state;

    return (
      isActive
        ? <div className={s.timer__wrap}>
          <div className={s.timer__text}>
            Re-sending the code will be possible through
          </div>
          <div className={s.timer}>
            {timer}
          </div>
        </div>
        : <button className={s.timer__btn} onClick={this.onSendAgain}>
          Send code again
        </button>
    );
  }
}
