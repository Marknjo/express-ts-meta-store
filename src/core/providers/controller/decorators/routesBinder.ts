/// Imports
// import 'reflect-metadata';

import { Meta } from '../../../stores/meta';
import { HandlerDescriptor, ProvidersTypes, AppMetaKeys } from '../../../types';
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

      Meta.define<string>({
        metaKey: AppMetaKeys.PATH,
        metaType: ProvidersTypes.CONTROLLER,
        metaValue: url,
        propertyKey: methodName,
      });

      Meta.define<string>({
        metaKey: AppMetaKeys.METHOD,
        metaType: ProvidersTypes.CONTROLLER,
        metaValue: httpMethod,
        propertyKey: methodName,
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
