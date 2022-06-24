import { randomUUID } from 'crypto';
import IdManagerModel from './model/IdManagerModel';

import { BaseStore, Listener } from '../../library/store';
import { ProvidersTypes } from '../../types';

class IdManagerStore extends BaseStore<
  IdManagerModel,
  Listener<IdManagerModel>
> {
  private static initilizer: IdManagerStore;

  private targetId: string | boolean = false;

  /**
   * Store initilizer
   */
  static get init() {
    if (!IdManagerStore.initilizer) {
      IdManagerStore.initilizer = new IdManagerStore();
      return IdManagerStore.initilizer;
    }

    return IdManagerStore.initilizer;
  }

  private constructor() {
    super();
  }

  /**
   * Finds previous generete id or current id if prev id matches the current ID
   *
   * @param targetName A string of the name of the target constructor name
   *
   * @param providerType Different types of stores - representing services
   *
   * @returns Previous base Controller Id or false if the current Id in store have a prev id
   */
  findCurrentId(providerType: ProvidersTypes, targetName: string) {
    const foundTargetName = this.findTargetName(providerType, targetName);

    return foundTargetName
      ? this.findPrevId(providerType)
      : this.findId(providerType);
  }

  /**
   * Find by id must require a target name to find the exact Id from the store
   * @param providerType A random generated id
   * @param targetName The name of the target constructor
   */
  findIdByTargetName(providerType: ProvidersTypes, targetName: string) {
    const foundIdConfigs = this.findByIdOrName({
      name: targetName,
      type: providerType,
    });

    return foundIdConfigs ? foundIdConfigs.id : false;
  }

  /**
   * Finds Id of the current item in the store
   *
   * Only works for base class decorator and class decorators that run before it.
   *
   * Returns regenerated id, for class decorators that runs after base class decorator
   * If you want previous generated id, use the findIdByTargetName instead.
   *
   * @returns Current base Controller Id
   */
  findId(providerType: ProvidersTypes) {
    /// Don't search id if it is available - find it from targetId cache
    if (this.targetId) {
      return this.targetId;
    }

    let foundId: boolean | IdManagerModel | string = false;

    if (!this.targetId) {
      foundId = this.findIdDetails(providerType);

      this.targetId = foundId ? (foundId as IdManagerModel).id : false;
    }

    if (foundId) {
      const results = foundId as IdManagerModel;

      return results.id;
    }

    return foundId;
  }

  /**
   * Use in all in-class decorators i.e. Property, accessors, and method generators.
   *
   * Also call it before running everything else in the base decorator.
   * RouterConfigs Class generator will need the Id to identiry which controller to assign the route.
   *
   * Do not use it in the other non-base docorators,
   * unless you are working with a different decorators for it's inner workings.
   *
   * @param providerType A type describing what service isusing the ID -
   * incase you have different services consuming the decorator
   * @returns  A random generated id
   */
  generateId(providerType: ProvidersTypes) {
    return this.generateIdFactory(providerType);
  }

  /**
   * Controllers use it to regenerate the ID.
   *
   * It is the last Decorator to run before the cycle.
   *
   * @param idOptions A collection of type previous id, type of Id service, and name
   */
  regenerateId(idOptions: {
    type: ProvidersTypes;
    prevId: string;
    name: string;
  }) {
    this.generateIdFactory(idOptions.type, true, idOptions);
  }

  /**
   *  Update Store
   * @param configs Each handler config
   */
  protected updateStore(configs: IdManagerModel): void {
    if (this.targetId) this.targetId = false;

    /// Get new meta data
    const currId = new IdManagerModel(
      configs.id,
      configs.type,
      configs.name ? configs.name : undefined,
      configs.prevId ? configs.prevId : undefined
    );

    /// Ensure there is always one type of MetaStoreType in the id store
    if (this.store.length > 0) {
      const filteredIds = this.store.filter(
        itemId => itemId.type !== currId.type
      );
      this.store = [...filteredIds, currId];
    }

    /// Initialize store with the first item
    if (this.store.length === 0) {
      this.store = [currId];
    }
  }

  /**
   * Id generator based whether an id is generated or not
   * @param providerType Based on MetaStoreTypes defination
   * @param regenerateId Whether to regenerate a new ID or not. Used by controller
   * @param regerateOptions Tracks pevious generated Id and current name of the controller
   * @returns A random generated id
   */
  private generateIdFactory(
    providerType: ProvidersTypes,
    regenerateId?: boolean,
    regerateOptions?: { type: ProvidersTypes; prevId: string; name: string }
  ) {
    /// Check if there's current provider id in the store
    const targetId = this.findId(providerType);

    if (targetId && !regenerateId) {
      return targetId as string;
    }

    /// Generate id if there is no id and dispatch
    const generatedId = randomUUID();

    this.dispatch({
      id: generatedId,
      type: providerType,
      ...(regerateOptions ? regerateOptions : {}),
    });

    return generatedId;
  }

  /**
   * Finds Id by name
   * @param providerType Different types of stores - representing services
   * @returns a found id or nothing (false)
   */
  private findPrevId(providerType: ProvidersTypes) {
    const foundIdConf = this.findIdDetails(providerType);

    return foundIdConf ? (foundIdConf as IdManagerModel).prevId : false;
  }

  /**
   * Find item in the store by name
   *  @param targetName The name of the target constructor
   */
  private findTargetName(providerType: ProvidersTypes, targetName: string) {
    const foundIdConfigs = this.findByIdOrName({
      name: targetName,
      type: providerType,
    });

    return foundIdConfigs ? foundIdConfigs.name : false;
  }

  /**
   * The store always hold a single array object of type @IdManagerModel
   * @params The target type of the constructor object
   * @returns Either a found id at position 0 or not
   */
  private findIdDetails(targetType: ProvidersTypes): IdManagerModel | boolean {
    const foundId = this.store.find(idItem => idItem.type === targetType);

    if (foundId) {
      return foundId;
    }

    return false;
  }

  /**
   * Helper method to find items in the store by either ID or Target name
   * @params Either target name or the id
   */
  private findByIdOrName(findOptions: {
    id?: string;
    name?: string;
    type: ProvidersTypes;
  }) {
    const keyNames = Object.keys(findOptions);

    /// Throw an error if id is empty
    if (keyNames.length === 0) {
      //@TODO: Add error handling -> No id provided
      return false;
    }

    const usedKey = (keyNames.at(0) as string) === 'id' ? 'id' : 'name';

    const foundItem = this.store.find(item => {
      if (usedKey === 'name') {
        return item['name'] && item.type === findOptions.type;
      }

      if (usedKey === 'id') {
        return item.id && item['name'] && item.type === findOptions.type;
      }
    });

    if (!foundItem) {
      return false;
    }

    return foundItem;
  }
}

const ManageId = IdManagerStore.init;

export { ManageId };
