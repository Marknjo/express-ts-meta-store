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
    return target.name;
  }

  private extractMetaOptions<TVal>(metaOptions: MetaModel) {
    const key = metaOptions.key;
    const value = metaOptions.value as TVal;
    const targetConstructor = metaOptions.targetConstructor;
    const method = metaOptions.method ? { method: metaOptions.method } : {};
    const type = metaOptions.type ? { type: metaOptions.type } : {};

    const id = this.getTargetName(targetConstructor);

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
   * @param configs Each handler config
   */
  protected updateStore(configs: MetaModel): void {
    const constructorName = this.getTargetName(configs.targetConstructor);

    /// Get new meta data
    const metaData = new MetaModel(
      configs.key,
      configs.targetConstructor,
      configs.constructorName ? configs.constructorName : undefined,
      configs.value ? configs.value : undefined,
      configs.method ? configs.method : undefined,
      configs.type ? configs.type : undefined,
      configs.id ? configs.id : undefined
    );

    this.store.push({
      ...(metaData.id ? { id: metaData.id } : {}),
      constructorName,
      key: metaData.key,
      value: metaData.value,
      targetConstructor: metaData.targetConstructor,
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
