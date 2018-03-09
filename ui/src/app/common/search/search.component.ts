import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '@itmp/arch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  public query: string;
  public types: Array<string>;
  public activeType: string;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getTypes();
    this.searchService.setActiveType('NINO');
  }

  buildForm() {
    this.form = new FormGroup({
      query: new FormControl('')
    });
    this.cdRef.detectChanges();
  }

  hideSearch() {
    this.searchService.setSearchVisible(false);
  }

  getTypes() {
    this.searchService.types$.subscribe(res => {
      this.types = res;
      this.activeType = res[0];
    });
  }

  setType($event) {
    this.activeType = $event.target.innerText;
    this.searchService.setActiveType(this.activeType);
  }

  doSearch() {
    let query = this.form.get('query').value;
    query = query.trim();
    this.searchService.setQuery(query);
  }
}
