import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const VALIDATOR_FUNCTIONS = {
  CHILD_DOB_MIN_MAX(minDateObj, maxDateObj): ValidatorFn {
    return (control: AbstractControl) => {
      // Initialise isValid
      let minDateValid = true;
      let maxDateValid = true;
      // Date format & current date
      let dateFormat = 'DD/MM/YYYY';

      // minDate validation
      let minDate = moment(minDateObj).subtract(1, 'days');
      minDateValid = moment(control.value, dateFormat).isValid();
      minDateValid = moment(control.value, dateFormat).isAfter(minDate);

      if (!minDateValid) {
        return { minDate: { valid: false } };
      }

      // maxDate validation
      maxDateValid = moment(control.value, dateFormat).isBefore(maxDateObj);
      if (!maxDateValid) {
        return { maxDate: { valid: false } };
      }
    };
  },
  MIN_MAX_DATE_VALIDATOR(minDateObj, maxDateObj): ValidatorFn {
    return (control: AbstractControl) => {
      //Putting condition if date textboxe hasn't  value (Non mandtory fields)
      if (
        control.value === '' ||
        control.value === null ||
        control.value === undefined
      ) {
        return null;
      }

      // Date format & current date
      let dateFormat = 'DD/MM/YYYY';

      // Convert value to date
      let date = moment(control.value, dateFormat).toDate();

      // Is a valid date
      let isValidDate = moment(control.value, dateFormat).isValid();
      if (!isValidDate) return { date: { valid: false } };

      // minDate validation
      let minDate = moment(minDateObj).subtract(1, 'days');
      let minDateValid = moment(control.value, dateFormat).isAfter(minDate);

      if (!minDateValid) {
        return { minDate: { valid: false } };
      }

      // maxDate validation
      let maxDate = moment(maxDateObj).add(1, 'days');
      let maxDateValid = moment(control.value, dateFormat).isBefore(maxDate);
      if (!maxDateValid) {
        return { maxDate: { valid: false } };
      }
    };
  },

  /**
   * Sorts an array of dates
   */
  sortDates(data, order, property) {
    return data.sort(function(a, b) {
      // Init Result
      let result = -1;

      // Store comparison as date type
      let dateA = moment(a[property], 'DD/MM/YYYY');
      let dateB = moment(b[property], 'DD/MM/YYYY');

      // Store if after and change result
      let before = dateB.isBefore(moment(dateA));
      if (before) result = 1;

      return result * order;
    });
  },

  /**
   * Convert a string to camel case
   * @param str
   */
  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  },

  /**
   * Check if object is empty
   * @param obj
   */
  isEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },

  /**
   * Escapes special characters in a string
   * @param str
   */
  addSlashes(str) {
    return (str + '')
      .replace(/[\n"']/g, ' ')
      .replace(/[\\"']/g, '\\$&')
      .replace(/\u0000/g, '\\0')
      .replace(/'/g, ' ');
  },

  /**
   * Convert wrongly formatted dates in an array
   * @param data
   * @param properties
   * @param currentFormat
   * @param requiredFormat
   */
  mapDates(
    data: Array<object>,
    properties: Array<string>,
    currentFormat: string,
    requiredFormat: string
  ) {
    return data.map(x => {
      if (typeof x === 'object') {
        Object.keys(x).forEach(key => {
          for (let property in properties) {
            if (key === properties[property]) {
              x[key] = moment(x[key], currentFormat).format(requiredFormat);
            }
          }
        });
      }
    });
  }
};
