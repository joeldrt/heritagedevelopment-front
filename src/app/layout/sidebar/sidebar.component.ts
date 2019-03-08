import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from '../../services/toastr/toastr.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
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
        this.toastr.error(error.message, "Error");
      }
    );
  }

}
