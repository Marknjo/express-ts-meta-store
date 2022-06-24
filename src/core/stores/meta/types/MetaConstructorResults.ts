import { GenericConstructor } from '../../../types/';

export interface MetaConstructorResults<TVal> {
  id: string;
  metaKey: string;
  metaValue: TVal;
  targetConstructor: GenericConstructor;
}
