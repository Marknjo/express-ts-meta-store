import { GenericConstructor } from '../types';
import { RouterConfigsOptions } from './types';

export const RouterConfigs = function (configs: RouterConfigsOptions) {
  return function (constructor: GenericConstructor) {
    // console.log(
    //   `Router config :(${constructor.name}): running...📍📍📍📍. Controller: `,
    //   constructor
    // );
  };
};
