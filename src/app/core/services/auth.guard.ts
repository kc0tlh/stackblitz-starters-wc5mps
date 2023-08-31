import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private cookieService: CookieService) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     return true;
  }


}
