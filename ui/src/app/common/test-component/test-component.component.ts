import { Component, OnInit } from '@angular/core';
import { Input, Injector } from '@angular/core'
import {BaseComponent} from '../../base/base.component'

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent extends BaseComponent implements OnInit {
  constructor(_injector: Injector) {
    super(_injector)
  }

  ngOnInit() {

    this.setup({label: 'Custom Label', id: 'tst-compoent', maxlength: 10})
  }
}
