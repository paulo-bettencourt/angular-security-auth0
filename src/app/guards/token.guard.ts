import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
class UserToken {}

@Injectable({
  providedIn: 'root',
})
class Permissions {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if(localStorage.getItem('jwtBringGlobalToken')) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

@Injectable()
export class CanActivateToken implements CanActivate {
  constructor(private permissions: Permissions, private currentUser: UserToken) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.permissions.canActivate();
  }
}
