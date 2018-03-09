/**
 * Model Class with mandatory properties need to set by developer to send audit messages on server
 */

export type AuditSequence = 'V' | 'E' | 'I' | 'D';

import { Audit } from './audit';
export class AuditModel {
  public static readonly VIEW = 'V';
  public static readonly EDIT = 'E';
  public static readonly INSERT = 'I';
  public static readonly DELETE = 'D';

  taxpayerReference: string;
  sequence: AuditSequence;
  functionalParameters: string[];

  constructor(
    taxpayerReference: string,
    sequence: AuditSequence,
    functionalParameters: string[]
  ) {
    this.taxpayerReference = taxpayerReference ? taxpayerReference : null;
    this.sequence = sequence ? sequence : null;
    this.functionalParameters = functionalParameters
      ? functionalParameters
      : null;
  }
  setSequence(sequence: AuditSequence) {
    this.sequence = sequence;
  }
  setTaxpayerReference(taxpayerReference) {
    this.taxpayerReference = taxpayerReference;
  }
  setFunctionalParameters(functionalParameters) {
    this.functionalParameters = functionalParameters;
  }
}
