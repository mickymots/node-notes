import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { ADD_SEARCH_RESULT } from '../state-manager/search.reducer';
import {
  ADD_SEARCH_QUERY,
  RESET_SEARCH_QUERY
} from '../state-manager/query.reducer';
import { AppStore } from '../state-manager/app.store';

@Injectable()
export class SearchService {
  private query = new ReplaySubject<any>();
  query$ = this.query.asObservable();

  private types = new ReplaySubject<any>();
  types$ = this.types.asObservable();

  private activeType = new ReplaySubject<any>();
  activeType$ = this.activeType.asObservable();

  private searchVisible = new ReplaySubject<any>();
  searchVisible$ = this.searchVisible.asObservable();

  constructor(
    private store: Store<AppStore>,
    private authService: AuthService
  ) {}

  /**
   * Store query in observable
   * @param route
   */
  setQuery(query: string) {
    this.query.next(query);
  }

  /**
   * Store types in observable
   * @param types
   */
  setTypes(types: Array<string>) {
    this.types.next(types);
  }

  /**
   * Store the search query
   * @param query
   */
  storeQuery(query: string) {
    //Updates <Store> to replace ':NINO' with value
    this.authService.updateAuthStore(query);

    this.store.dispatch({
      type: ADD_SEARCH_QUERY,
      payload: query
    });
  }

  /**
   * Resets the query in the store
   */
  resetQuery() {
    this.store.dispatch({
      type: RESET_SEARCH_QUERY
    });
  }

  /**
   * Fetch query from store
   */
  fetchQuery() {
    return this.store.select('query');
  }

  /**
   * Store the search result
   * @param result
   */
  storeResult(result: Object) {
    this.store.dispatch({
      type: ADD_SEARCH_RESULT,
      payload: result
    });
  }

  /**
   * Fetch query from store
   */
  fetchResult() {
    return this.store.select('search');
  }

  /**
   * Store selected search type in observable
   * @param types
   */
  setActiveType(activeType: string) {
    this.activeType.next(activeType);
  }

  /**
   * Set searchVisible property
   * @param searchVisible
   */
  setSearchVisible(searchVisible: boolean) {
    this.searchVisible.next(searchVisible);
  }
}
