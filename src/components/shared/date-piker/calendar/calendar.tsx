import React from 'react';
import s from './calendar.module.scss';
import calendar, {
  CALENDAR_MONTHS,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  isDate,
  isSameDay, isSameMonth,
  WEEK_DAYS,
} from '../helper';

interface IProps {
  date: Date

  onDateChange?(date: Date): void
}

interface IState {
  current: Date
  month: number
  year: number
  today: Date
}

export class Calendar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { date } = this.props;
    const isDateObject = isDate(date);
    const _date: Date = isDateObject ? date : new Date();

    this.state = {
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
      today: new Date(),
    };
  }

  resolveStateFromDate(date) {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();

    return {
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    };
  }

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    const calendarMonth = month || +current.getMonth() + 1;
    const calendarYear = year || current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };

  gotoDate = date => evt => {
    evt && evt.preventDefault();
    const { current } = this.state;
    const { onDateChange } = this.props;

    !(current && isSameDay(date, current)) &&
    this.setState(this.resolveStateFromDate(date), () => {
      typeof onDateChange === 'function' && onDateChange(date);
    });
  };

  gotoPreviousMonth = () => {
    const { month, year } = this.state;
    this.setState(getPreviousMonth(month, year));
  };

  gotoNextMonth = () => {
    const { month, year } = this.state;
    this.setState(getNextMonth(month, year));
  };

  renderHeader = () => {
    const { month, year } = this.state;
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
      ];

    // return (
    //   <Styled.CalendarHeader>
    //     <Styled.ArrowLeft
    //       onMouseDown={this.handlePrevious}
    //       onMouseUp={this.clearPressureTimer}
    //       title="Previous Month"
    //     />
    //     <Styled.CalendarMonth>
    //       {monthname} {year}
    //     </Styled.CalendarMonth>
    //     <Styled.ArrowRight
    //       onMouseDown={this.handleNext}
    //       onMouseUp={this.clearPressureTimer}
    //       title="Next Month"
    //     />
    //   </Styled.CalendarHeader>
    // );

    return (
      <div className={s.header}>
        <button className={s.arrowLeft} onClick={this.gotoPreviousMonth}/>
        <div className={s.month}>
          {monthname} {year}
        </div>
        <button className={s.arrowRight} onClick={this.gotoNextMonth}/>
      </div>
    );
  };

  renderDayLabel = (day) => {
    const label = WEEK_DAYS[day].toUpperCase();
    return (
      <div key={label} className={s.day}>
        {label}
      </div>
    );
  };

  renderCalendarDate = (date, index) => {
    const { current, month, year, today } = this.state;
    const _date = new Date(date.join('-'));

    const isToday = isSameDay(_date, today);
    const isCurrent = current && isSameDay(_date, current);
    const inMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

    const onClick = this.gotoDate(_date);

    const props = { index, inMonth, onClick, title: _date.toDateString() };

    // const DateComponent = isCurrent
    //   ? Styled.HighlightedCalendarDate
    //   : isToday
    //     ? Styled.TodayCalendarDate
    //     : Styled.CalendarDate;

    return (
      <div key={getDateISO(_date)} className={s.day}>
        {_date.getDate()}
      </div>
    );
  };

  componentDidUpdate(prevProps) {
    const { date, onDateChange } = this.props;
    const { date: prevDate } = prevProps;
    const dateMatch = date == prevDate || isSameDay(date, prevDate);

    !dateMatch &&
    this.setState(this.resolveStateFromDate(date), () => {
      typeof onDateChange === 'function' && onDateChange(date);
    });
  }

  render() {
    return (
      <div className={s.container}>
        {this.renderHeader()}
        <div className={s.grid}>
          {
            Object.keys(WEEK_DAYS).map(this.renderDayLabel)
          }
          {
            this.getCalendarDates().map(this.renderCalendarDate)
          }
        </div>
      </div>
    );
  }
}
