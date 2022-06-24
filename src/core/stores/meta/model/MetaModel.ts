import {
  GenericConstructor,
  ProvidersTypes,
  SiteWideKeys,
} from '../../../types';

export class MetaModel {
  constructor(
    public id: string,
    public metaKey: SiteWideKeys,
    public type: ProvidersTypes,
    public value?: string | number | {} | any[],
    public targetConstructor?: GenericConstructor | Function | any,
    public constructorName?: string,
    public propertyKey?: string
  ) {}
}
