import { EntityMetadata } from '@ngrx/data';

export interface AuthMetadata extends EntityMetadata<any> {
  loggedIn?: boolean;
}
