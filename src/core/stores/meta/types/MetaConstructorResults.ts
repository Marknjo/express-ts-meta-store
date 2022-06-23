import { GenericConstructor } from '../../../types/';

export interface MetaConstructorResults<TVal> {
  id: string;
  key: string;
  value: TVal;
  targetConstructor: GenericConstructor;
}
