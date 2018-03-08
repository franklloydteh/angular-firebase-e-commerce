import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/map'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.appUser$.map(appUser => appUser.isAdmin);
  }

}
