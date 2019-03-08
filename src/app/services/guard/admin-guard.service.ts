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

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && (user.roles.admin || user.roles.root)? true : false),
      tap(isAdminOrRoot => {
        if (!isAdminOrRoot) {
          console.error('Access denied - Admins only');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      })
    );
  }
}
