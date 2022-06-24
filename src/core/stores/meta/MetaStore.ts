import { MetaModel } from './model/MetaModel';
import { GenericConstructor, ProvidersTypes, AppMetaKeys } from '../../types';
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
    metaKey: AppMetaKeys
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

  /**
   * Gets all properties in a target constructor with a decorator
   * @param id This is the unique id for the current target constructor
   * @param type Unique identifier of every provider type.
   * @returns Returns a filtered collection of all properties with the decorators
   */
  getPropertiesKeys(id: string, type: ProvidersTypes) {
    const results = this.getPropertiesMetaFactory<string[]>(id, type);

    return results;
  }

  //// PRIVATE HELPERS METHODS

  /**
   * A factory method that preps results of
   * target constructor properties keys with their values or not
   *
   * @param id This is the unique id for the current target constructor
   * @param type Unique identifier of every provider type.
   * @param type Unique identifier of every provider type.
   * @returns Returns a filtered collection of all properties with the decorators
   */
  private getPropertiesMetaFactory<TVal>(
    id: string,
    type: ProvidersTypes,
    withValues: boolean = false
  ) {
    const filteredProperties: MetaModel[] | [] = this.store.filter(
      meta => meta.propertyKey && meta.id === id && meta.type === type
    );

    let returnResults: [{ propertyKey: string; value: TVal }] | string[] = [];

    if (withValues) {
    }

    /// Get a collection properties keys
    if (!withValues) {
      returnResults = this.getPropertiesKeysWithoutDublicates(
        filteredProperties
      ) as string[] | [];
    }

    const results = returnResults.length > 0 ? returnResults : false;

    return results;
  }

  /**
   * Helper methods that abstracts process of filtering and mapping filtered properties to remove dublicates
   *
   * @param filteredProperties A collection of MetaModel
   * @returns a collection of properties names in a give target constructor
   */
  getPropertiesKeysWithoutDublicates(filteredProperties: MetaModel[]) {
    if (filteredProperties && filteredProperties.length > 0) {
      /// Map only properties
      const mappedProperties = filteredProperties.map(
        meta => meta.propertyKey
      ) as string[];

      /// Filter dublicates
      const filteredPropertiesWithoutDublicates = mappedProperties.reduce(
        (prevProp, currProp, indx) => {
          let prevPropIndx = prevProp.length - 1;

          if (prevProp[prevPropIndx] !== currProp) {
            prevProp =
              prevProp[indx] === '' ? [currProp] : [...prevProp, currProp];
          }

          return prevProp;
        },
        ['']
      );

      return filteredPropertiesWithoutDublicates;
    }
  }
}

const Meta = MetaStore.init;

export { Meta };
