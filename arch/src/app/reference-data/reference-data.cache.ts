import { ReferenceData } from './reference-data';
import { ReferenceDataGroup } from './reference-data.group';

/**
 * This is a singleton class with a single attribute
 * It is separated out from the ReferenceDataService to allow for the possibility
 * of more complex cache management.
 * @class REFDATACACHE
 */
export class REFDATACACHE {
  public static referenceData: ReferenceDataGroup;
}
