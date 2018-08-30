import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';

import { Search } from './search.model';
import { SearchActions } from './search.reducer';
import { CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent extends SmartComponent implements OnInit {

  routeName = 'search';

  constructor(public store: Store<any>) {
    super(store);
  }

  get query(): Search {
    return new Search();
  }

  ngOnInit() {
  }

  quickSearch(query: Search) {
    this.dispatch(HttpActions.post(`search/quick`, query, SearchActions.POST));
  }

  search(query: Search) {
    this.dispatch(HttpActions.post(`search`, query, SearchActions.POST));
  }

}
