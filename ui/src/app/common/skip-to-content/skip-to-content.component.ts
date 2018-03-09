import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skip-to-content',
  templateUrl: './skip-to-content.component.html',
  styleUrls: ['./skip-to-content.component.scss']
})
export class SkipToContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  scroll() {
    const element = document.getElementById('main');
    if (element) {
      element.scrollIntoView();
      element.focus();
    }
  }
}
