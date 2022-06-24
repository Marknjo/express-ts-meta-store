import { MetaModel } from './model/MetaModel';
import { GenericConstructor, ProvidersTypes, SiteWideKeys } from '../../types';
import { BaseStore, Listener } from '../../library/store';

import {
  GetTargetConstructorOptions,
  MetaConstructorResults,
  MetaDefineOptions,
} from './types';
import { ManageId } from '../idManager';

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
    const metaKey = metaOptions.metaKey;
    const constructorName = metaOptions.constructorName
      ? { constructorName: metaOptions.constructorName }
      : {};
    const value: { value: TVal } | {} = metaOptions.value
      ? { value: metaOptions.value }
      : {};
    const targetConstructor = metaOptions.targetConstructor
      ? { targetConstructor: metaOptions.targetConstructor }
      : {};
    const propertyKey = metaOptions.propertyKey
      ? { propertyKey: metaOptions.propertyKey }
      : {};
    const type = metaOptions.type;
    const id = metaOptions.id;

    return {
      id,
      metaKey,
      type,
      ...value,
      ...targetConstructor,
      ...constructorName,
      ...propertyKey,
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
      incomingMeta.metaKey,
      incomingMeta.type,
      incomingMeta.value,
      incomingMeta.targetConstructor,
      incomingMeta.constructorName,
      incomingMeta.propertyKey
    );

    this.store.push({
      id: metaData.id,
      metaKey: metaData.metaKey,
      type: metaData.type,
      ...(metaData.value ? { value: metaData.value } : {}),
      ...(constructorName ? { constructorName } : {}),
      ...(metaData.targetConstructor
        ? { targetConstructor: metaData.targetConstructor }
        : {}),
      ...(metaData.propertyKey ? { propertyKey: metaData.propertyKey } : {}),
    });
  }

  /**
   * Edit dispatch to define | defineMeta
   */
  define<TVal>(submittedOptions: MetaDefineOptions) {
    const id = ManageId.generateId(submittedOptions.type);

    const definedOption: MetaModel = { ...submittedOptions, id };

    const options = this.extractMetaOptions<TVal>(definedOption);

    this.dispatch({
      ...options,
      id,
    });
  }

  /**
   * Get metadata
   */
  getData<TVal>(
    metaOptions: MetaModel
  ): boolean | TVal | MetaConstructorResults<TVal>[] {
    // const { id, metaKey, propertyKey, type } =
    const { id, metaKey, propertyKey, type } =
      this.extractMetaOptions<TVal>(metaOptions);
    const foundMethod = propertyKey ? propertyKey : false;

    // const foundType = type ? type : false;
    const filteredMetadata = this.store.filter(meta => {
      /// Arrange search creteria
      const idSearchCreteria = meta.id === id;
      const keyAndTypeCreteria = meta.metaKey === metaKey && meta.type === type;

      /// Get a propertyKey on a constructor
      if (foundMethod) {
        if (
          idSearchCreteria &&
          keyAndTypeCreteria &&
          meta.propertyKey === propertyKey
        ) {
          return meta;
        } else {
          return false;
        }
      }

      /// Get get a metaKey on a constructor
      if (idSearchCreteria && keyAndTypeCreteria) {
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

  /**
   * Get's target constructor and name
   *
   * Returns undefined if not found
   *
   * @param id This is the unique id for the current target constructor
   * @param metaKey This is the SiteKey associated with the propertyKey
   * @param type This is the type of the current process
   * @returns a target constructor and it's name
   */
  getTargetConstructor(
    id: string,
    type: ProvidersTypes,
    metaKey: SiteWideKeys
  ): GetTargetConstructorOptions {
    const foundConstructor = this.store.find(
      meta => meta.id === id && meta.type === type && meta.metaKey === metaKey
    );

    const searchResults = foundConstructor
      ? {
          targetConstructor: foundConstructor.targetConstructor,
          constructorName: foundConstructor.constructorName
            ? foundConstructor.targetConstructor.name
            : foundConstructor.constructorName,
        }
      : undefined;

    return searchResults;
  }

  getProperties() {}

  //// PRIVATE HELPERS METHODS
}

const Meta = MetaStore.init;

export { Meta };
