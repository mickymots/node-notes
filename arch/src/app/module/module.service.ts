import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Module } from './module';

@Injectable()
export class ModuleService {
  private modules = new ReplaySubject<Module>();
  modulesAnnounced$ = this.modules.asObservable();

  constructor() { }

  setModule(module: Module) {
      this.modules.next(module);
  }
}