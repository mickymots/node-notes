import { ReferenceDataType } from './reference-data.enum';

/**
 * Holds a single datum, along with its metadata. The type is an ASCII string which names the data type.
 * The id is a number, a unique ID which is read from the file stored on NPS.
 * The (start_date, end_date) pair define the time interval dyuring which the value is valid
 * The values field is the datum value. The name 'values' is from the format of the Reference Data in NPS
 * but in fact this is a single value, a string, in each case.
 * @class ReferenceData
 *
 */
export class ReferenceData {
  type: ReferenceDataType;
  id: string;
  start_Date: string;
  end_Date: string;
  values: string;

  constructor() {
    this.type = undefined;
    this.id = undefined;
    this.start_Date = undefined;
    this.end_Date = undefined;
    this.values = undefined;
  }
}


