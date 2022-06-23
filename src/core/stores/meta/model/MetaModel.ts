import { GenericConstructor, SiteWideKeys } from '../../../types';
import { MetaStoreTypes } from '../types';

export default class MetaModel {
  constructor(
    public id: string,
    public key: SiteWideKeys,
    public value?: string | number | {} | any[],
    public targetConstructor?: GenericConstructor | any,
    public constructorName?: string,
    public method?: string,
    public type?: MetaStoreTypes
  ) {}
}
