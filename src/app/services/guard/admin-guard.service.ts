import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  private adminArray: Array<string> = ['root', 'superuser', 'administrator', 'hdadministrator'];

  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const localUserString = localStorage.getItem('user');
    const user = JSON.parse(localUserString);
    if (user && user.role && user.role.type) {
      if (this.adminArray.includes(user.role.type)) {
        return true;
      }
    }
    console.error('Access denied - Admins only');
    this.router.navigate(['/login']);
    return false;
  }
}
