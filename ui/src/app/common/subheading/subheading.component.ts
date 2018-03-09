import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subheading',
  templateUrl: './subheading.component.html',
  styleUrls: ['./subheading.component.scss']
})
export class SubheadingComponent implements OnInit {
  @Input() text: string;
  @Input() buttonIcon: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;
  @Input() buttonLink: string;

  constructor() { }

  ngOnInit() {
  }

}
