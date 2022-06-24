import {
  GenericConstructor,
  ProvidersTypes,
  AppMetaKeys,
} from '../../../types';

export interface MetaDefineOptions {
  metaKey: AppMetaKeys;
  metaType: ProvidersTypes;
  metaValue?: string | number | {} | any[];
  targetConstructor?: GenericConstructor | any;
  constructorName?: string;
  propertyKey?: string;
}
