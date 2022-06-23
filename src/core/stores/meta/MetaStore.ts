import { MetaModel } from './model/MetaModel';
import { GenericConstructor } from '../../types';
import { BaseStore, Listener } from '../../library/store';

import { MetaConstructorResults } from './types';

class MetaStore extends BaseStore<MetaModel, Listener<MetaModel>> {
  private static initilizer: MetaStore;

  /**
   * Store initilizer
   */
  static get init() {
    if (!MetaStore.initilizer) {
      MetaStore.initilizer = new MetaStore();
      return MetaStore.initilizer;
    }

    return MetaStore.initilizer;
  }

  constructor() {
    super();
  }

  private getTargetName(target: GenericConstructor) {
    return target ? target.name : false;
  }

  private extractMetaOptions<TVal>(metaOptions: MetaModel) {
    const key = metaOptions.key;
    const value = metaOptions.value as TVal;
    const targetConstructor = metaOptions.targetConstructor;
    const method = metaOptions.method ? { method: metaOptions.method } : {};
    const type = metaOptions.type;
    const id = metaOptions.id;

    return {
      key,
      value,
      targetConstructor,
      ...method,
      type,
      id,
    };
  }

  /**
   *  Update Store
   * @param incomingMeta Each handler config
   */
  protected updateStore(incomingMeta: MetaModel): void {
    const constructorName = this.getTargetName(incomingMeta.targetConstructor);

    /// Get new meta data
    const metaData = new MetaModel(
      incomingMeta.id,
      incomingMeta.key,
      incomingMeta.type,
      incomingMeta.value,
      incomingMeta.targetConstructor,
      incomingMeta.constructorName,
      incomingMeta.method
    );

    this.store.push({
      id: metaData.id,
      key: metaData.key,
      type: metaData.type,
      ...(metaData.value ? { value: metaData.value } : {}),
      ...(constructorName ? { constructorName } : {}),
      ...(metaData.targetConstructor
        ? { targetConstructor: metaData.targetConstructor }
        : {}),
      ...(metaData.method ? { method: metaData.method } : {}),
    });
  }

  /**
   * Edit dispatch to define | defineMeta
   */
  define<TVal>(metaOptions: MetaModel) {
    const options = this.extractMetaOptions<TVal>(metaOptions);

    this.dispatch({
      ...options,
    });
  }

  /**
   * Get metadata
   */
  getData<TVal>(
    metaOptions: MetaModel
  ): boolean | TVal | MetaConstructorResults<TVal>[] {
    // const { id, key, method, type } =
    const { id, key, method, type } =
      this.extractMetaOptions<TVal>(metaOptions);
    const foundMethod = method ? method : false;
    // const foundType = type ? type : false;

    const filteredMetadata = this.store.filter(meta => {
      /// Get a method on a constructor
      if (foundMethod) {
        if (
          meta.id === id &&
          meta.key === key &&
          meta.method === method &&
          meta.type === type
        ) {
          return meta;
        } else {
          return false;
        }
      }

      /// Get get a key on a constructor
      if (meta.id === id && meta.key === key && meta.type === type) {
        return meta;
      } else {
        return false;
      }
    });

    /// Get metadata values
    let foundMetadata: boolean | MetaConstructorResults<TVal>[] | TVal = false;

    if (filteredMetadata.length === 1) {
      foundMetadata = filteredMetadata[0].value as
        | TVal
        | MetaConstructorResults<TVal>[];
    }

    return foundMetadata;
  }
}

const Meta = MetaStore.init;

export { Meta };
