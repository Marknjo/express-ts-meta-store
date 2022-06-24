import {
  GenericConstructor,
  ProvidersTypes,
  AppMetaKeys,
} from '../../../types';

export interface MetaDefineOptions {
  metaKey: AppMetaKeys;
  type: ProvidersTypes;
  value?: string | number | {} | any[];
  targetConstructor?: GenericConstructor | any;
  constructorName?: string;
  propertyKey?: string;
}
