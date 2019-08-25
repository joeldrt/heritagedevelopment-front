import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  title: string;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = authService.getCurrentUser();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inmuebles']);
  }

}
