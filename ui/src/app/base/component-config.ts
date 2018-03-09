import { ErrorMessage } from './error-message';
import { ValidatorFn } from '@angular/forms';

export interface ComponentConfig {
  id: string;
  label: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: any | RegExp;
  validatorFn?: ValidatorFn;
  messages?: ErrorMessage;
}
