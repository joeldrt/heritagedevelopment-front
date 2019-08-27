import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AdminUsersComponent } from 'src/app/admin/admin-users/admin-users.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  private adminArray: Array<string> = ['root', 'superuser', 'administrator', 'hdadministrator'];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.auth.user$.pipe(
    //   take(1),
    //   map(user => user && (user.roles.admin || user.roles.root)? true : false),
    //   tap(isAdminOrRoot => {
    //     if (!isAdminOrRoot) {
    //       console.error('Access denied - Admins only');
    //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //     }
    //   })
    // );
    const localUserString = localStorage.getItem('user');
    const user = JSON.parse(localUserString);
    if (user && user.role && user.role.type) {
      if (this.adminArray.includes(user.role.type)) {
        return true;
      }
    }
    console.error('Access denied - Admins only');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
