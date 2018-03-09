import { JsonProperty } from '@itmp/arch';
import { Name } from './name';

// DDO610.NMDTLSLS
export class NameList {
  @JsonProperty<Name>({ name: 'name', clazz: Name })
  name: Name = undefined;
}
