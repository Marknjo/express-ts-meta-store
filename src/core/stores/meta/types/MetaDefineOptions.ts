import {
  GenericConstructor,
  ProvidersTypes,
  SiteWideKeys,
} from '../../../types';

export interface MetaDefineOptions {
  metaKey: SiteWideKeys;
  type: ProvidersTypes;
  value?: string | number | {} | any[];
  targetConstructor?: GenericConstructor | any;
  constructorName?: string;
  propertyKey?: string;
}
