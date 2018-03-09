import { JsonProperty } from '@itmp/arch';
import { Residency } from './residency';

// DDO610.RESDTLST
export class ResidencyList {
  @JsonProperty<Residency>({ name: 'residency', clazz: Residency })
  residency: Residency = undefined;
}
