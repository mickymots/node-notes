import { OptLockPerson } from '../opt-lock/opt-lock-person';
import { JsonProperty } from '@itmp/arch';

export class DA2Response {
  @JsonProperty<OptLockPerson>({ name: 'optLockPerson', clazz: OptLockPerson })
  optLockPerson?: OptLockPerson = null;
  jsonServiceError?: any = null;
}
