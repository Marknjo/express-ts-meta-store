import {
  GenericConstructor,
  ProvidersTypes,
  AppMetaKeys,
} from '../../../types';

export class MetaModel {
  constructor(
    public id: string,
    public metaKey: AppMetaKeys,
    public type: ProvidersTypes,
    public value?: string | number | {} | any[],
    public targetConstructor?: GenericConstructor | Function | any,
    public constructorName?: string,
    public propertyKey?: string
  ) {}
}
