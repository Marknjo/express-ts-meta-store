import {
  GenericConstructor,
  ProvidersTypes,
  SiteWideKeys,
} from '../../../types';

export class MetaModel {
  constructor(
    public id: string,
    public key: SiteWideKeys,
    public type: ProvidersTypes,
    public value?: string | number | {} | any[],
    public targetConstructor?: GenericConstructor | any,
    public constructorName?: string,
    public method?: string
  ) {}
}
