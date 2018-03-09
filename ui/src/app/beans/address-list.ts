import { JsonProperty } from '@itmp/arch';
import { Address } from './address';

// DDO610.ADDTLSLS
export class AddressList {
  @JsonProperty<Address>({ name: 'address', clazz: Address })
  address: Address[] = undefined;
}
