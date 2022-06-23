import { GenericConstructor } from '../../types';

class Utils {
  private static initializer: Utils;

  static get instance() {
    if (!Utils.initializer) {
      Utils.initializer = new Utils();
      return Utils.initializer;
    }

    return Utils.initializer;
  }

  private constructor() {}

  /**
   * Convert a camel cased word with first letter uppercased to lowercase
   * @param str A word with first charactor uppercased
   * @returns lowercased first character of a word. i.e. MyWord = myWord
   */
  firstCharToLowerCase(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * Convert a camel cased word with first letter lowercased to upper case
   * @param str A word with first charactor uppercased
   * @returns lowercased first character of a word. i.e. MyWord = myWord
   */
  firstCharToUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Checks whether the value returned by a handler is a promise or not
   * @param handler the methods/function returned as promise or not
   * @returns Results of whether the function/handler is a promise or not
   */
  isPromise(handler: any) {
    if (typeof handler === 'object' && typeof handler.then === 'function') {
      return true;
    }
    return false;
  }

  getControllerHandlers(targetConstructor: GenericConstructor) {
    return Object.getOwnPropertyNames(targetConstructor.prototype);
  }
}

export const AppUtils = Utils.instance;
