import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut().then(
      (value) => {
        localStorage.removeItem('admin');
        this.router.navigate(['/inmuebles']);
      },
      (error) => {

      }
    );
  }

}
