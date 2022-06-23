/**
 *
 * Base Store
 *
 * Generics defination
 *  - S -> Class the store that implements receives this defination
 *  - M -> Model describing the payload
 *  - L -> Type of Listener function
 */

export abstract class BaseStore<
  M extends { [key: string]: any },
  L extends Function
> {
  protected listeners: L[] = [];

  protected store: M[] = [];

  constructor() {}

  /// Methods implementation
  /**
   * Update Store
   */
  protected abstract updateStore(configs: M): void;

  /// Define methods
  /**
   * Adds a listener to the store
   * @param listenerFn A function that listens to changes in the store
   */
  addListener(listenerFn: any): void {
    this.listeners.push(listenerFn);
  }

  /**
   * Dispatches routes/data to the route store
   */
  dispatch(payload: M) {
    /// Get new Routes data
    this.updateStore(payload);

    /// Update listeners
    this.updateListers();
  }

  /**
   * Updates listeners when the store is pudated
   */
  private updateListers() {
    for (let listener of this.listeners) {
      listener([...this.store]);
    }
  }

  /**
   * Gets the store state
   */
  findAll() {
    return this.store;
  }

  /**
   * Find By Id and Identifier
   */
  protected findAllBy(findBy: { [key: string]: any }) {
    const findByItems = Object.entries(findBy);

    /// Throw error, expects only one item
    if (findByItems.length > 1) {
      return false;
    }

    const findByValue = Object.values(findBy)[0];
    const findByKey = Object.keys(findBy)[0];

    const foundItems = this.store.filter(
      store => store[findByValue] === findByKey
    );

    if (!foundItems) {
      return false;
    }

    return foundItems;
  }

  /**
   * Find items in the store
   */
  protected findById(id: string, value: string): M | boolean {
    const foundItem = this.store.find(item => item[id] === value);

    if (!foundItem) {
      return false;
    }

    return foundItem;
  }
}
