import { JsonProperty } from '@itmp/arch';
import { OptLockPerson } from './opt-lock-person';

//what response will come back from all calls
export class DA2Response {
  @JsonProperty<OptLockPerson>({ name: 'optLockPerson', clazz: OptLockPerson })
  optLockPerson?: OptLockPerson = null;
  jsonServiceMessage?: any = null;
}
