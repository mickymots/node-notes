import {
  Component,
  OnInit,
  Input,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('main') main: ElementRef;
  @Input() type: string;
  mainClass: string;
  contentClass: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.mainClass = this.type === 'itmp' ? 'main-dashboard' : 'main-routes';
    this.contentClass = this.type === 'itmp' ? 'dashboard-content' : 'content';
  }

  scroll() {
    let element = document.getElementById('main');
    if (element) {
      element.scrollIntoView();
    }
  }
}
