import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() level: 'primary' | 'secondary' = 'primary';
  @Input() colour: 'blue' | 'red' | 'black' = 'blue';
  @Input() idRef: string;
  @Input() accesskeyRef: string;
  @Input() routerLink: string;
  @Input() disabled: boolean;
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
