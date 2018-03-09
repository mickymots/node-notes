import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HelpService } from '@itmp/arch';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@itmp/arch';
import { SearchService } from '@itmp/arch';
import { ClassLogger } from '../../decorators/logger/class-logger.decorator';

@Component({
  selector: 'app-icon-nav',
  templateUrl: './icon-nav.component.html',
  styleUrls: ['./icon-nav.component.scss'],
  host: { '(document:mousedown)': 'onClick($event)' }
})
export class IconNavComponent implements OnInit {
  @ViewChild('searchBox') searchBox;
  @Input() type: string;
  public class: string;
  public query: string;
  public search: boolean = false;
  private subscription: Subscription;

  constructor(
    private helpService: HelpService,
    private router: Router,
    public authService: AuthService,
    private elementRef: ElementRef,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.detectNavigation();
    this.subscribeToSearchVisible();
    this.subscribeToQuery();
    this.helpService.updateQuery();
    this.type === 'itmp' ? (this.class = 'dash-icons') : false;
  }

  subscribeToSearchVisible() {
    this.searchService.searchVisible$.subscribe(res => {
      this.search = res;
    });
  }

  subscribeToQuery() {
    this.subscription = this.helpService.queryAnnounced$.subscribe(query => {
      this.query = query;
    });
  }

  onClick(e) {
    if (this.searchBox) {
      if (!(this.searchBox.nativeElement as HTMLElement).contains(e.target)) {
        console.log('test');
        this.hideSearch();
      }
    }
  }

  toggleSearch() {
    this.searchService.setSearchVisible(!this.search);
  }

  hideSearch() {
    this.searchService.setSearchVisible(false);
  }

  detectNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideSearch();
      }
    });
  }

  /**
   * Set Auth status to 'false' before exiting application
   * Then close application window
   */
  exitApp() {
    this.authService.logOut();
    window.close();
  }

  openHelp() {
    window.open(
      this.query,
      'winname',
      'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=800,height=600'
    );
  }
}
