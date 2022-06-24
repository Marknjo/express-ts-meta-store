/// Imports
// import 'reflect-metadata';

import { Meta } from '../../../stores/meta';
import {
  HandlerDescriptor,
  ProvidersTypes,
  SiteWideKeys,
} from '../../../types';
// import { Controller } from '../Controller';
import { HttpMethods } from '../types';

export let currentController: string = '';

/// Define route binder decorator
const routesBinder = function (httpMethod: HttpMethods) {
  return function (url: string) {
    return function (_: any, methodName: string, _desc: HandlerDescriptor) {
      currentController = 'ClientControllerId';

      /// Define Associated Method
      // Reflect.defineMetadata(
      //   SiteWideKeys.METHOD,
      //   httpMethod,
      //   constructor,
      //   methodName
      // );
      // const pro = Object.getPrototypeOf(constructor);

      // console.log({ pro: constructor.prototype });

      /// Define Associated route path
      // Reflect.defineMetadata(SiteWideKeys.PATH, url, constructor, methodName);
      // console.log({ constructor });

      Meta.define<string>({
        metaKey: SiteWideKeys.PATH,
        type: ProvidersTypes.CONTROLLER,
        value: url,
        propertyKey: methodName,
      });

      Meta.define<string>({
        metaKey: SiteWideKeys.METHOD,
        type: ProvidersTypes.CONTROLLER,
        value: httpMethod,
        propertyKey: methodName,
      });

      Meta.define<string>({
        metaKey: SiteWideKeys.PROVIDER,
        type: ProvidersTypes.CONTROLLER,
        value: 'My Provider',
      });
    };
  };
};

/// Export various http methods
export const Get = routesBinder(HttpMethods.GET);
export const Post = routesBinder(HttpMethods.POST);
export const Delete = routesBinder(HttpMethods.DELETE);
export const Patch = routesBinder(HttpMethods.PATCH);
export const Put = routesBinder(HttpMethods.PUT);
