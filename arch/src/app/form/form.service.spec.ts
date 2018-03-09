import { TestBed, inject } from '@angular/core/testing';

import { FormService } from './form.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

let formService: FormService;
let notification: any;

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
  });

  beforeEach(
    inject([FormService], (service: FormService) => {
      this.formService = service;
      this.formService.editableAnnounced$.subscribe(
        result => (notification = result)
      );
    })
  );

  it('TEST 1: should be created', () => {
    expect(this.formService).toBeTruthy();
  });

  it('TEST 2: it should check if FormGroup is valid', () => {
    let formValidSpy = spyOn(this.formService, 'isFormValid');
    let triggerErrorsSpy = spyOn(this.formService, 'triggerErrors');
    let focusErrorSpy = spyOn(this.formService, 'focusError');

    let validForm = new FormGroup({
      first: new FormControl('validFirstTest'),
      last: new FormControl('validLastTest')
    });

    this.formService.isFormValid(validForm);
    expect(this.formService.isFormValid).toHaveBeenCalled();
    expect(this.formService.triggerErrors).not.toHaveBeenCalled();
    expect(this.formService.focusError).not.toHaveBeenCalled();
  });

  it('TEST 3: it should check that FormGroup is valid and triggerErrors & focuseError are called', () => {
    let formValidSpy = spyOn(this.formService, 'isFormValid').and.callThrough();
    let triggerErrorsSpy = spyOn(this.formService, 'triggerErrors');
    let focusErrorSpy = spyOn(this.formService, 'focusError');

    let invalidForm = new FormGroup({
      first: new FormControl('invalidFirstTest', Validators.maxLength(2)),
      last: new FormControl('invalidLastTest', Validators.maxLength(2))
    });

    this.formService.isFormValid(invalidForm);
    expect(this.formService.isFormValid).toHaveBeenCalled();
    expect(this.formService.triggerErrors).toHaveBeenCalledWith(invalidForm);
    expect(this.formService.focusError).toHaveBeenCalled();
  });

  it('TEST 4: should call triggerErrors with invalid form and then triggerErrors for single FormGroup item', () => {
    let formValidSpy = spyOn(this.formService, 'isFormValid').and.callThrough();
    let triggerErrorsSpy = spyOn(
      this.formService,
      'triggerErrors'
    ).and.callThrough();
    let triggerErrorSpy = spyOn(this.formService, 'triggerError');
    let focusErrorSpy = spyOn(this.formService, 'focusError');

    let invalidForm = new FormGroup({
      first: new FormControl('invalidTestValue', Validators.maxLength(2))
    });

    this.formService.isFormValid(invalidForm);
    expect(
      (triggerErrorSpy.calls.allArgs()[0][0] as FormControl).value
    ).toEqual(invalidForm.controls['first'].value);
  });

  it('TEST 5: should call triggerErrors with invalid form then triggerFormGroupErrors with invalid FormGroup child, finally triggerError for each child', () => {
    let formValidSpy = spyOn(this.formService, 'isFormValid').and.callThrough();
    let triggerErrorsSpy = spyOn(
      this.formService,
      'triggerErrors'
    ).and.callThrough();
    let triggerFormGroupErrorsSpy = spyOn(
      this.formService,
      'triggerFormGroupErrors'
    ).and.callThrough();
    let focusErrorSpy = spyOn(this.formService, 'focusError');
    let triggerErrorSpy = spyOn(this.formService, 'triggerError');

    let testForm = new FormGroup({
      testFG: new FormGroup({
        testFGA: new FormControl('validA'),
        testFGB: new FormControl('invalidB', Validators.maxLength(1))
      })
    });

    this.formService.isFormValid(testForm);
    expect(
      (triggerFormGroupErrorsSpy.calls.allArgs()[0][0] as FormGroup).controls[
        'testFGB'
      ].value
    ).toEqual(
      (testForm.controls['testFG'] as FormGroup).controls['testFGB'].value
    );
    expect(triggerErrorSpy.calls.count()).toEqual(2);
  });

  it('TEST 6: should call triggerErrors with invalid form then triggerFormGroupErrors with invalid FormArray child', () => {
    let formValidSpy = spyOn(this.formService, 'isFormValid').and.callThrough();
    let triggerErrorsSpy = spyOn(
      this.formService,
      'triggerErrors'
    ).and.callThrough();
    let triggerFormGroupErrorsSpy = spyOn(
      this.formService,
      'triggerFormGroupErrors'
    );
    let focusErrorSpy = spyOn(this.formService, 'focusError');

    let testForm = new FormGroup({
      testFG: new FormArray([
        new FormControl('invalidTest', Validators.maxLength(1))
      ])
    });

    this.formService.isFormValid(testForm);
    expect(
      (triggerFormGroupErrorsSpy.calls.allArgs()[0][0] as FormArray).value
    ).toEqual(testForm.controls['testFG'].value[0]);
  });

  it('TEST 7: should be editable', () => {
    this.formService.setEditable(true);
    expect(notification).toBeTruthy();
  });

  it('TEST 8: should be not editable', () => {
    this.formService.setEditable(false);
    expect(notification).toBeFalsy();
  });
});
