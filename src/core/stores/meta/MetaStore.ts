import MetaModel from './model/MetaModel';
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
    const type = metaOptions.type ? { type: metaOptions.type } : {};

    const id = metaOptions.id;

    return {
      key,
      value,
      targetConstructor,
      ...method,
      ...type,
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
      incomingMeta.value,
      incomingMeta.targetConstructor,
      incomingMeta.constructorName,
      incomingMeta.method,
      incomingMeta.type
    );

    this.store.push({
      id: metaData.id,
      key: metaData.key,
      value: metaData.value,
      ...(constructorName ? { constructorName } : {}),
      ...(metaData.targetConstructor
        ? { targetConstructor: metaData.targetConstructor }
        : {}),
      ...(metaData.method ? { method: metaData.method } : {}),
      ...(metaData.type ? { type: metaData.type } : {}),
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
    const { id, key, method } = this.extractMetaOptions<TVal>(metaOptions);
    const foundMethod = method ? method : false;
    // const foundType = type ? type : false;

    const filteredMetadata = this.store.filter(meta => {
      /// Get a method on a constructor
      if (foundMethod) {
        if (meta.id === id && meta.key === key && meta.method === method) {
          return meta;
        } else {
          return false;
        }
      }

      /// Get get a key on a constructor
      if (meta.id === id && meta.key === key) {
        return meta;
      } else {
        return false;
      }
    });

    let foundMetadata: boolean | MetaConstructorResults<TVal>[] | TVal;

    /// get metadata stored in a method
    if (foundMethod) {
      if (filteredMetadata[0]) {
        foundMetadata = filteredMetadata[0].value as TVal;
      } else {
        foundMetadata = false;
      }
    }

    if (filteredMetadata[0]) {
      foundMetadata = filteredMetadata as MetaConstructorResults<TVal>[];
    } else {
      foundMetadata = false;
    }

    /// Return filtered data
    return foundMetadata;
  }
}

const Meta = MetaStore.init;

export { Meta };
