import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Class: {
    selectId: (classes: any) => classes._id
  }
};

// because the plural of "hero" is not "heros"
const pluralNames = { Class: 'Classes'};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
