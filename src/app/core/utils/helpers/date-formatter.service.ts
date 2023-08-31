import { Injectable } from '@angular/core';
import moment from 'moment';
import { BusinessHours } from '../../models/api/responses/business-hours';
import { CONST } from '../constant';

@Injectable()
export class DateFormatter {

  public static DATE_FORMAT = /^\d{4}-\d{1,2}-\d{1,2}$/;

  constructor() {
  }

  private date(y: number, m: number, d: number): Date {
    return this.dateFromString(y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d));
  }

  /**
   * Get today date
   * please use this instead of javascript new Date()
   * @param setTimeToZero
   */
  public getToday(setTimeToZero?: boolean): Date {
    const today = moment().toDate();
    if (setTimeToZero) {
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
    }
    return today;
  }

  /**
   * Return Date object by date string
   * @param date (2021-05-18)
   */
  public dateFromString(date: string, format?: string): Date {
    if (date.match(DateFormatter.DATE_FORMAT)) {
      return moment(date).toDate();
    } else if (format) {
      return moment(date, format).toDate();
    } else {
      throw Error('Invalid date string..');
    }
  }

  /**
   * check given string is date string
   * @param date
   * @param format
   */
  public isValidDate(date: string, format = DateFormatter.DATE_FORMAT): boolean {
    return date.match(format) !== null;
  }

  /**
   * Format date as a string
   * @param {Date} date
   * @param {string} format use any moment format
   */
  public dateAsString(date?: Date | number | string, format = CONST.DEFAULTS.DATE_FORMAT): string {
    if (date) {
      return moment(date).format(format);
    } else {
      return moment().format(format);
    }
  }

  /**
   * convert date object to YYYY-MM-DD from any format
   * @param date
   * @param format
   */
  public dateAsStringFromFormat(date?: Date | string, format?: string): string {
    if (date) {
      return moment(date, format).format('YYYY-MM-DD');
    } else {
      return moment().format('YYYY-MM-DD');
    }
  }

  /**
   * Format date and time as a string
   * @param {Date} date
   * @param {string} format use any moment format
   */
  public dateAsStringWithTime(date: Date, format = 'YYYY-MM-DD HH:mm'): string {
    if (date) {
      const d = this.date(date.getFullYear(), date.getMonth() + 1, date.getDate());
      d.setHours(date.getHours(), date.getMinutes());
      return moment(d).format(format);
    } else {
      return moment().format(format);
    }
  }

  /**
   * Change format of date string to format to another
   * @param date - date as string
   * @param currentFormat - current date format
   * @param format - expected date format
   */
  public dateStringChangeFormat(date: string, currentFormat: string, format: string): string {
    return moment(date, [currentFormat]).format(format);
  }

  /**
   * get time as string by Date object
   * @param date
   */
  public timeAsString(date: Date): string {
    let time = '';
    if (date) {
      time = date.getHours().toString() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    return time;
  }

  /**
   * convert '2018-07-09T14:40:48' to java script date
   */
  public dateFromStringWithTime(date: string): Date {
    if (date.match(/^\d{4}-\d{2}-\d{2}[A-Z]{1}\d{2}:\d{2}:*\d*$/)) {
      return moment(date).toDate();
    } else {
      throw Error('Invalid date string..');
    }
  }

  /**
   * convert '14:40:48' to java script date
   */
  public dateFromStringWithTimeFormat(date: string, format = 'HH:mm:ss'): Date {
    if (date.match(/^\d{2}:\d{2}:*\d*$/)) {
      return moment(date, format).toDate();
    } else {
      throw Error('Invalid date string..');
    }
  }

  /**
   * convert '"Mon May 16 1988 00:00:00 GMT+0530 (Sri Lanka Standard Time)"' date to java script date
   */
  public dateFromFullDateString(dateString: string): Date | null {
    let date = null;
    if (moment(dateString).isValid()) {
      date = moment(dateString).toDate();
    }
    return date;
  }

  /**
   * Add number of days to date and return date
   * @param date
   * @param days
   * @param format
   */
  public addDaysToDate(date: Date | string, days: number, format?: string) {
    return moment(date, format).add(days, 'days').format(format);
  }

  /**
   * Subtract number of days to date and return date string (YYYY-MM-DD)
   * @param date
   * @param days
   * @param format
   */
  public subtractDaysFromDate(date: Date | string, days: number, format?: string) {
    return moment(date, format).subtract(days, 'days').format(format);
  }

  /**
   * Subtract number of days from today to date and return date string (YYYY-MM-DD)
   * @param days
   * @param format
   */
  public substractDaysFromTodayToDate(days: number, format?: string) {
    return moment().subtract(days, 'days').format(format);
  }

  /**
   * Checks if there is a second date after the first date.
   * @param date1
   * @param date2
   * @param format
   */
  public isAfter(date1: Date | string, date2: Date | string, format?: string) {
    return moment(date1).format(format) > moment(date2).format(format);
  }

  /**
   * Det days difference between two dates
   * @param {Date | string} date1
   * @param {Date | string} date2
   * @returns {number}
   */
  public diffDays(date1: Date | string, date2: Date | string): number {
    return moment(date1).diff(moment(date2), 'days');
  }

  /**
   * Det years difference between two dates
   * @param {Date | string} date1
   * @param {Date | string} date2
   * @returns {number}
   */
  public diffYears(date1: Date | string, date2: Date | string): number {
    return moment(date1).diff(moment(date2), 'years');
  }

  /**
   * Get past date
   * @param {Date} date
   * @param {number} value
   * @param type
   * @returns {Date}
   */
  public getPastDate(date: Date, value: number, type: any = 'years') {
    return moment(date).subtract(value, type).toDate();
  }

  /**
   * Get future date
   * @param {Date} date
   * @param {number} value
   * @param type
   * @returns {Date}
   */
  public getFutureDate(date: Date, value: number, type: any = 'years') {
    return moment(date).add(value, type).toDate();
  }

  /**
   * Convert date String to DD-MM-YYYY Date() object
   * @param date
   */
  public getFormattedDateForBinding(date: string) {
    return moment(date, 'DD-MM-YYYY').toDate();
  }

  /**
   * Convert 24hrs time to 12hrs time.
   * @param time24hrs ==> '07:00:00'
   * @param isRound
   */
  public formatTime(time24hrs: any, isRound?: boolean) {
    // Check correct time format and split into components
    time24hrs = time24hrs.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24hrs];

    if (time24hrs.length > 1) { // If time format correct
      time24hrs = time24hrs.slice(1);  // Remove full string match value
      time24hrs[3] = +time24hrs[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time24hrs[0] = (+time24hrs[0] % 12 || 12) < 10 ? '0' + (+time24hrs[0] % 12 || 12).toString() : (+time24hrs[0] % 12 || 12).toString(); // Adjust hours
      if (isRound) {
        time24hrs[2] = +time24hrs[2] >= 30 ? 30 : '00';
      }

    }
    return time24hrs.join(''); // return adjusted time or original string
  }

  /**
   * Get 24hrs time without seconds.
   * @param time24hrs ==> '13:00:00'
   * @return time ==> '13:00'
   */
  public formatDisplayTime(time24hrs: any) {
    // Check correct time format and split into components
    time24hrs = time24hrs.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24hrs];

    let time = [];
    if (time24hrs.length > 1) { // If time format correct
      time = time24hrs[0].split(':'); // Get full matched string and split it
      time = time.slice(0, 2); // Remove seconds
    }
    return time.join(':'); // return adjusted time or original string
  }

  /**
   * Get 24hrs from 12hrs
   * @param time12Hours
   * @param withSeconds
   */
  public formatTimeToHours(time12Hours: any, withSeconds?: boolean) {
    if (withSeconds) {
      return moment(time12Hours, ['h:mm A']).format('HH:mm:ss');
    } else {
      return moment(time12Hours, ['h:mm A']).format('HH:mm');
    }
  }


  /**
   * convert local date string to required format
   * @param localDate
   * @param format
   */
  public dateFromLocalDateString(localDate: string, format: string) {
    return moment(localDate).local().format(format);

  }

  /**
   * Get 12hrs from 24hrs with AM/PM
   * @param time24Hour
   */
  public formatHoursToTime(time24Hour: string) {
    return moment(time24Hour, ['h:mm A']).format('LT');
  }

  /**
   * Checks if there is a second time after the first time.
   * @param time1
   * @param time2
   * @param format
   */
  public isAfterTime(time1: Date | string, time2: Date | string, format: string) {
    return moment(time1, format) > moment(time2, format);
  }

  /**
   * Generate list of times by using given time gap
   * Ex: for 30 min gap
   *    ['12:00 AM', '12:30 AM', ...., '11:30 PM']
   * @param timeGapMin - time gap in minutes
   * @param format - time format default is 'hh:mm A'
   */
  public generateTimeSelectionList(timeGapMin: number = 30, format: string = 'hh:mm A'): string[] {
    const timeSelectionList = [];
    const date = new Date(-1000 * 60 * 30 * 11); // 00:00
    const end = new Date(1000 * 60 * 60 * 24 - 1000 * 60 * 30 * 11); // 24:00

    if (timeGapMin <= 0) {
      return [];
    }

    while (date < end) {
      timeSelectionList.push(moment(date).format(format));
      date.setMinutes(date.getMinutes() + timeGapMin);
    }

    return timeSelectionList;
  }


  /**
   * sort days array by week days order using given sortDependable key
   * Eg: [{day: 'mon', value:10},{day:'fri', value:20},{day:'tue',value:19}]
   *          -> [{day:'mon',value:10},{day:'tue',value:19},{day:'fri', value:20}]
   * if you need to start sort from Wednesday then sortDependable is 'wed'
   * @param dataArray
   * @param sortDependable
   */
  public getSortedWeekdays(dataArray: any[], sortDependable: any) {
    const list = [
      CONST.DAYS.SHORT_MON, CONST.DAYS.SHORT_TUE, CONST.DAYS.SHORT_WED, CONST.DAYS.SHORT_THU,
      CONST.DAYS.SHORT_FRI, CONST.DAYS.SHORT_SAT, CONST.DAYS.SHORT_SUN
    ];
    const sorted_list = list.slice(sortDependable).concat(list.slice(0, sortDependable));
    return dataArray.sort(function sortDays(a, b) {
      return sorted_list.indexOf(a.day) - sorted_list.indexOf(b.day);
    });
  }

  /**
   * check day string and return short format
   * @param day
   * eg: 'sun' -> 'Sunday'
   */
  public getFullNameOfDay(day: string) {
    switch (day) {
      case CONST.DAYS.SHORT_MON:
        return CONST.DAYS.MONDAY;

      case CONST.DAYS.SHORT_TUE :
        return CONST.DAYS.TUESDAY;

      case CONST.DAYS.SHORT_WED :
        return CONST.DAYS.WEDNESDAY;

      case CONST.DAYS.SHORT_THU :
        return CONST.DAYS.THURSDAY;

      case CONST.DAYS.SHORT_FRI :
        return CONST.DAYS.FRIDAY;

      case CONST.DAYS.SHORT_SAT :
        return CONST.DAYS.SATURDAY;

      default :
        return CONST.DAYS.SUNDAY;
    }
  }


  /**
   * check day string and return full format
   * @param day
   * eg: 'Monday' -> 'mon'
   */
  public getShortNameOfDay(day: string) {
    switch (day) {
      case CONST.DAYS.MONDAY:
        return CONST.DAYS.SHORT_MON;

      case CONST.DAYS.TUESDAY :
        return CONST.DAYS.SHORT_TUE;

      case CONST.DAYS.WEDNESDAY :
        return CONST.DAYS.SHORT_WED;

      case CONST.DAYS.THURSDAY :
        return CONST.DAYS.SHORT_THU;

      case CONST.DAYS.FRIDAY :
        return CONST.DAYS.SHORT_FRI;

      case CONST.DAYS.SATURDAY :
        return CONST.DAYS.SHORT_SAT;

      default :
        return CONST.DAYS.SHORT_SUN;
    }
  }


}
