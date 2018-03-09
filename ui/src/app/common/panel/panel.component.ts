import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements AfterViewInit {
  @Input() heading: string;
  @Input() collapsed: boolean = false;
  @Input() panelIdRef: string;
  @ViewChild('panelBody') body; 
  @ViewChild('panelHead') head; 

  private height: string;

  constructor() {}

  ngAfterViewInit() {}

  toggleExpanded() {
    this.collapsed = !this.collapsed;
  }
}
