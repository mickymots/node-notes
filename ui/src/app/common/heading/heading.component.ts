import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() text: string
  @Input() buttonIcon: string
  @Input() buttonText: string
  @Input() buttonClass: string
  @Input() buttonLink: string
  @Input() showRequiredMessage = false
  constructor() {}

  ngOnInit() {}
}
