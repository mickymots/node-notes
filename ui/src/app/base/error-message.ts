export interface ErrorMessage {
  required?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
  date?: string;
  default?: string;
  minDate?: string;
  maxDate?: string;
  notMonday?: string;
}

export const ERROR_MESSAGES: ErrorMessage = {
  required: 'Please enter ',
  maxLength: ' has maximum length of ',
  minLength: ' requires minimum length of ',
  pattern: ' must be in the format DD/MM/YYYY',
  date: ' must be a valid date',
  default: ' is not valid',
  minDate: ' cannot be before ',
  maxDate: ' cannot be after ',
  notMonday: ' must be a Monday'
};

export const ERROR_MESSAGE_STRINGS = {
  CRN: ' must be in the format QQ123456',
  NAME: ' valid characters are letters, spaces, hyphens and apostrophes only',
  FIELD: ' field',
  FUTURE_DATE: ' must be a valid date',
  CHILD_DOB_MIN_DATE: ' must be later than 01/01/1997',
  DATE_FORMAT_DDMMYYYY: ' must be in the format DD/MM/YYYY',
  TABLE_NO_DATA: 'No data found',
  TABLE_NO_MATCHL: 'No data to match criteria',
  MONEY: 'is not in correct format (.00)',
  INSTITUTION_NAME: ' contains invalid characters',
  UTR: 'is in invalid format(must be 10 digits and first digit cannot be zero)',
  TRN: ' is in invalid format',
  SLCREF: 'is in invalid format(up to maximum of 11 digits and cannot be zero)',
  BRN: ' valid characters are numbers, letters and forward slashes only',
  NINO: ' must be in the format QQ123456 or QQ123456Q',
  REQUIRED: 'is a required field',
  FREE_TEXT: 'The following characters [ ] * are invalid'
};

export const MessageBuilder = (label: string, ...messages: string[]) => {
  return label
    .concat(
    messages.reduce((obj, message) => {
      return obj.concat(message).concat(' ');
    }, ' ')
    )
    .trim();
};
