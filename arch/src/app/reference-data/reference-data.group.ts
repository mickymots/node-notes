import { ReferenceData } from './reference-data';
import { JsonProperty } from '../serialization/JsonMetaData';

/**
 * This is a model/entity class that represents ReferenceData Array
 */
export class ReferenceDataGroup {
  @JsonProperty<ReferenceData>({ name: 'data', clazz: ReferenceData })
  public data: ReferenceData[];

  constructor() {
    this.data = [];
  }
}
