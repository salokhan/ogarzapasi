import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(
        (user) => {
          if (user && user.emailVerified !== true) {
            this.router.navigate(['/account/login'], {
              queryParams: { returnUrl: state.url },
            });
            return resolve(false);
          }
          return resolve(true);
        },
        (err) => {
          if (route.routeConfig.path === 'register') {
            this.router.navigate(['/account/login'], {
              queryParams: { returnUrl: state.url },
            });
          } else {
            this.router.navigate(['/account/login'], {
              queryParams: { returnUrl: state.url },
            });
          }
          return resolve(true);
        }
      );
    });
  }
}
