import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthNgRxService extends EntityCollectionServiceBase<any> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Auth', serviceElementsFactory);
  }

  // Update the authentication state when the user logs in or logs out
  setLoggedIn(loggedIn: boolean) {
    this.update({ loggedIn });
  }

  // Get the current authentication state from the store
  isLoggedIn$: Observable<boolean> = this.store.select((state: any) => state.auth.loggedIn);
}

