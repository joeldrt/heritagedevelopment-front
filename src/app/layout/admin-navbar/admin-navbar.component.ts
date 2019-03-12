import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  title: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.title = this.getTitle(router.routerState, router.routerState.root).join('-');
        }
      }
    );
  }

  ngOnInit() {
  }

  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

}
