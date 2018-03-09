import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {
  @Input() heading: string;
  @Input() collapsed: boolean = true;
  @ViewChild('menuBody') body;
  @ViewChild('menuHead') head;
  private height: string;

  constructor() { }

  ngAfterViewInit() {
    // this.measureHeight();
  }

  measureHeight() {
    let elem = this.body.nativeElement;
    this.height = elem.scrollHeight;
    let height = (this.collapsed) ? '0px' : this.height + 'px';
    this.body.nativeElement.style.height = height;
  }

  toggleExpanded() {
    this.collapsed = !this.collapsed;
    this.setHeight();
  }

  setHeight() {
    let height = (this.collapsed) ? '0px' : this.height + 'px';
    this.body.nativeElement.style.height = height;
  }

}
