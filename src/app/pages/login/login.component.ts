import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from '../../services/toastr/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.email || !this.password) {
      return;
    }
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(
      (credentials) => {
        this.user = credentials.user;
        localStorage.setItem('admin', JSON.stringify(this.user));
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

}
