import {
  GenericConstructor,
  ProvidersTypes,
  AppMetaKeys,
} from '../../../types';

export class MetaModel {
  constructor(
    public id: string,
    public metaKey: AppMetaKeys,
    public metaType: ProvidersTypes,
    public metaValue?: string | number | {} | any[],
    public targetConstructor?: GenericConstructor | Function | any,
    public constructorName?: string,
    public propertyKey?: string
  ) {}
}
