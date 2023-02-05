import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
class UserToken {}

@Injectable({
  providedIn: 'root',
})
class Permissions {
  canActivate(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

@Injectable()
export class CanActivateToken implements CanActivate {
  constructor(private permissions: Permissions, private currentUser: UserToken) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log("guard")
    return this.permissions.canActivate();
  }
}
