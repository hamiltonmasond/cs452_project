import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public headerTitle: string = '';
  public currentRoute: string = '';

  constructor(private router: Router) {}
  ngOnInit(): void {

    this.currentRoute = this.router.url;
    if (this.currentRoute === '/create-entry') {
      this.headerTitle = 'Create Entry';
    } else if(this.currentRoute.startsWith('/edit-entry')) {
      this.headerTitle = 'Edit Application';
    } else {
      this.headerTitle = 'Game Locker';
    }
  }
}
