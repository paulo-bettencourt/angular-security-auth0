import { EntityMetadataMap } from '@ngrx/data';
import {AuthMetadata} from "../interfaces/auth-meta-data-ngrx.interface";

const entityMetadata: EntityMetadataMap = {
  Class: {
    selectId: (classes: any) => classes._id
  },
  Image: {

  },
  Auth: {
    loggedIn: false
  } as AuthMetadata
};

// because the plural of "hero" is not "heros"
const pluralNames = { Class: 'Classes', Image: 'Images' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
