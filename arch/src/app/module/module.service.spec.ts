import { TestBed, inject } from '@angular/core/testing';

import { ModuleService } from './module.service';
import { Module } from 'app/module/module';

let moduleService: ModuleService;
let serviceResult: any;

describe('ModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleService]
    });
  });

  beforeEach(
    inject([ModuleService], (service: ModuleService) => {
      this.moduleService = service;
      this.moduleService.modulesAnnounced$.subscribe(
        result => (serviceResult = result)
      );
    })
  );

  it('should be created', () => {
    expect(this.moduleService).toBeTruthy();
  });

  it('should set the module', () => {
    let testModule: Module = {
      name: 'testName',
      code: 'testCode',
      path: 'testPath',
      routes: 'testRoute'
    };

    this.moduleService.setModule(testModule);
    expect(serviceResult).toBeTruthy();
    expect(serviceResult.name).toEqual('testName');
    expect(serviceResult.code).toEqual('testCode');
    expect(serviceResult.path).toEqual('testPath');
    expect(serviceResult.routes).toEqual('testRoute');
  });
});
