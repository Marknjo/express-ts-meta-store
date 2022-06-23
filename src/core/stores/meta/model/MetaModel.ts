import { GenericConstructor, SiteWideKeys } from '../../../types';
import { MetaStoreTypes } from '../types';

export default class MetaModel {
  constructor(
    public key: SiteWideKeys,
    public targetConstructor: GenericConstructor | any,
    public constructorName?: string,
    public value?: string | number | {} | any[],
    public method?: string,
    public type?: MetaStoreTypes,
    public id?: string
  ) {}
}
