import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardService implements CanActivate {

  private clientArray: Array<string> = ['authenticated'];

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.storageService.getUser();
    if (user && user.role && user.role.type) {
      if (this.clientArray.includes(user.role.type)) {
        return true;
      }
    }
    console.error('Access denied - Clients only');
    this.router.navigate(['/login']);
    return false;
  }
}
