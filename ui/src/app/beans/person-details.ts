import { JsonProperty } from '@itmp/arch';
import { NameList } from './name-list';
import { AddressList } from './address-list';
import { Indicators } from './indicators';
import { ResidencyList } from './residency-list';

// DDO610.PERSDTL
export class PersonDetails {
  nino: string = undefined;
  ninoSuffix: string = undefined;
  accountStatusType: number = undefined;
  sex: string = undefined;
  dateOfEntry: string = undefined;
  dateOfBirth: string = undefined;
  dateOfBirthStatus: number = undefined; 
  dateOfDeath: string = undefined;
  dateOfDeathStatus: number = undefined;
  dateOfRegistration: string = undefined;
  registrationType: number = undefined;
  specialistBusinessArea: any = undefined;
  adultRegSerialNumber: string = undefined;
  cesaAgentIdentifier: string = undefined;
  permanentTSuffixCaseIndicator: number = undefined;
  currOptimisticLock: number = undefined;
  liveCapacitorInd: number = undefined;
  liveAgentInd: number = undefined;
  ntTaxCodeInd: number = undefined;
  mergeStatus: number = undefined;
  marriageStatusType: number = undefined;
  nameList: NameList = undefined;
  addressList: AddressList = undefined;
  indicators: Indicators = undefined;
  residencyList: ResidencyList = undefined;
}
