import {
  FormControl,
  ControlValueAccessor,
  Validator,
  Validators,
  NgControl
} from '@angular/forms';
import { Input, Output, Injector } from '@angular/core';
import { REGEX } from '../base/regex';
import {
  ERROR_MESSAGES,
  ErrorMessage,
  MessageBuilder
} from '../base/error-message';
import { ComponentConfig } from '../base/component-config';

export class BaseComponent implements ControlValueAccessor, Validator {
  // Component specific data
  @Input() idRef: string;
  @Input() label: string;
  @Input() customErrorMessage: string;
  @Input() options: any;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() size: '1-8' | '1-4' | '1-3' | '1-2' | '2-3' | '3-4';
  @Input() cssClass: any;

  // Configurable validations
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() required: boolean;
  @Input() regEx: string | RegExp;
  @Output() childControl = new FormControl();

  standardMessages: ErrorMessage;
  private _control: NgControl;
  private _dirty: boolean;
  private _touched: boolean;

  @Input()
  get dirty() {
    return this.control ? this.control.dirty : this._dirty;
  }

  @Input()
  get touched() {
    return this.control ? this.control.touched : this._touched;
  }

  constructor(private _injector: Injector) {}

  /**
   * Setup the component config + validation
   * Invoked on component OnInit Event
   * @param _config
   */
  setup(_config: ComponentConfig) {
    this.idRef = this.idRef ? this.idRef : _config.id;
    this.label = this.label ? this.label : _config.label;
    this.maxlength = this.maxlength ? this.maxlength : _config.maxlength;
    this.minlength = this.minlength ? this.minlength : _config.minlength;
    this.required = this.required ? this.required : _config.required;
    this.regEx = this.regEx ? this.regEx : _config.pattern;
    if (!this.readonly) {
      this.setValidators(_config);
    }

    this.childControl.valueChanges.subscribe(value => {
     if (value && typeof value === 'string' && value != value.toUpperCase()) {
        setTimeout(()=>{this.childControl.setValue(value.toUpperCase())},0);
      }
    });
  }

  /**
   * Set validators based on component config
   * @param _config
   */
  private setValidators(_config: ComponentConfig) {
    let configuredValidators = [];

    this.required ? configuredValidators.push(Validators.required) : false;
    this.regEx
      ? configuredValidators.push(Validators.pattern(this.regEx))
      : false;
    this.minlength
      ? configuredValidators.push(Validators.minLength(this.minlength))
      : false;
    this.maxlength
      ? configuredValidators.push(Validators.maxLength(this.maxlength))
      : false;
    _config.validatorFn
      ? configuredValidators.push(_config.validatorFn)
      : false;

    let messages = _config.messages ? _config.messages : {};
    let customeMessage = this.customErrorMessage
      ? { pattern: this.customErrorMessage }
      : {};
    this.standardMessages = Object.assign(
      {},
      this.buildMessages(),
      messages,
      customeMessage
    );
    this.childControl.setValidators(configuredValidators);
  }

  /**
   * Sets the control value - is the method that writes a new value from the form model into the view
   * or (if needed) DOM property
   * @param value
   */
  writeValue(value: any) {
     this.childControl.setValue(value)
  }

  /**
   * Subscribe to control value changes
   * This is a method that registers a handler that should be called when something in the view has changed.
   * It gets a function that tells other form directives and form controls to update their values.
   * @param fn
   */
  registerOnChange(fn: (value: any) => void) {
    this.childControl.valueChanges.subscribe(fn);
  }

  /**
   * Returns control value
   */
  value(): any {
    return this.childControl.value;
  }

  /**
   * Added by the Validator interface. This method uses the errorMessage to
   * get all the error of this component
   */
  validate(ctrl) {
    return this.childControl.errors;
  }

  registerOnTouched() {}

  /**
   * Set disabled state of control
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.childControl.disable({
      onlySelf: isDisabled,
      emitEvent: false
    });
  }

  /**
   * Returns error messages
   * Triggered after first focus, then instant
   */
  public get errorMessage(): string {
    if (
      this.childControl.errors &&
      (this.childControl.touched ||
        this.control.touched ||
        this.childControl.hasError('notMonday'))
    ) {
      if (this.childControl.hasError('required')) {
        return this.standardMessages.required;
      } else if (this.childControl.hasError('maxlength')) {
        return this.standardMessages.maxLength;
      } else if (this.childControl.hasError('pattern')) {
        return this.standardMessages.pattern;
      } else if (this.childControl.hasError('minlength')) {
        return this.standardMessages.minLength;
      } else if (this.childControl.hasError('date')) {
        return this.standardMessages.date;
      } else if (this.childControl.hasError('minDate')) {
        return this.standardMessages.minDate;
      } else if (this.childControl.hasError('maxDate')) {
        return this.standardMessages.maxDate;
      } else if (this.childControl.hasError('notMonday')) {
        return this.standardMessages.notMonday;
      } else {
        return this.standardMessages.default;
      }
    }
  }

  /**
   * Returns the FormControl for the component
   */
  protected get control(): NgControl {
    if (this._control != null) {
      return this._control;
    }
    this._control = this._injector.get(NgControl, null).control;
    return this._control;
  }

  /**
   * Build validation messages using MessageBuilder function
   */
  private buildMessages(): any {
    return {
      required: MessageBuilder(ERROR_MESSAGES.required, this.label),
      maxLength: MessageBuilder(
        this.label,
        ERROR_MESSAGES.maxLength,
        this.maxlength ? this.maxlength.toString() : '',
        'characters'
      ),
      minLength: MessageBuilder(
        this.label,
        ERROR_MESSAGES.minLength,
        this.minlength ? this.minlength.toString() : '',
        'characters'
      ),
      pattern: MessageBuilder(this.label, ERROR_MESSAGES.pattern),
      date: MessageBuilder(
        this.label,
        ERROR_MESSAGES.date,
        "greater than today's date."
      ),
      minDate: MessageBuilder(this.label, ERROR_MESSAGES.minDate),
      maxDate: MessageBuilder(this.label, ERROR_MESSAGES.maxDate),
      default: MessageBuilder(this.label, ERROR_MESSAGES.default)
    };
  }

  /**
   * Convert a string to camel case
   * @param str
   */
  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
