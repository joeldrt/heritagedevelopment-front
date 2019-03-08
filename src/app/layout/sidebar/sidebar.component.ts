import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from '../../services/toastr/toastr.service';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user)
  }

  logout(){
    this.afAuth.auth.signOut().then(
      (value) => {
        this.router.navigate(['/inmuebles']);
      },
      (error) => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

}
