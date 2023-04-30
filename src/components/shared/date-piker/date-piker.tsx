import React from 'react';
import s from './date-piker.module.scss';
import { Calendar } from './calendar/calendar';
import { getDateISO, isDate } from './helper';

interface IProps {
  value?: Date

  onDateChange?(date: Date): void
}

interface IState {
  date: string
  calendarOpen: boolean
}

export class DatePiker extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: null,
      calendarOpen: false,
    };
  }

  toggleCalendar = () =>
    this.setState({ calendarOpen: !this.state.calendarOpen });

  componentDidMount() {
    const { value: date } = this.props;
    const newDate = date && new Date(date);

    isDate(newDate) && this.setState({ date: getDateISO(newDate) });
  }

  componentDidUpdate(prevProps) {
    const { value: date } = this.props;
    const { value: prevDate } = prevProps;
    const dateISO = getDateISO(new Date(date));
    const prevDateISO = getDateISO(new Date(prevDate));

    dateISO !== prevDateISO && this.setState({ date: dateISO });
  }

  render() {
    const { value, onDateChange } = this.props;
    const { calendarOpen } = this.state;

    return (
      <div className={s.container}>
        <div className={s.wrap}>
          <input
            type="text"
            readOnly
            placeholder="YYYY / MM / DD"
            className={s.input}
          />
          <i className="icon-calendar" onClick={this.toggleCalendar}/>
        </div>
        <div className={s.dropdown}>
          {
            calendarOpen && <Calendar date={value} onDateChange={onDateChange}/>
          }
        </div>
      </div>
    );
  }
}
