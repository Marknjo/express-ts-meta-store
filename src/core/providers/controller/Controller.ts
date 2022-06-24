import { AppUtils } from '../../library/helpers/Utils';
import { ManageId } from '../../stores/idManager';

import { Meta, MetaModel } from '../../stores/meta';
import { GenericConstructor, ProvidersTypes, SiteWideKeys } from '../../types';

export const Controller = function () {
  return function (constructor: GenericConstructor) {
    /// Update constructor meta (TargetConstructor and constructorName)
    Meta.define<string>({
      key: SiteWideKeys.BASE_CONSTRUCTOR,
      type: ProvidersTypes.CONTROLLER,
      targetConstructor: constructor,
      constructorName: constructor.prototype,
    });

    // Generate Id if not declared
    const targetId = ManageId.findId(ProvidersTypes.CONTROLLER) as string;

    // console.log(
    //   `Controller :(${constructor.name}): running... 🚩🚩🚩🚩🚩 . Constructor: `,
    //   constructor,
    //   genetatedId
    // );

    const handlers = AppUtils.getControllerHandlers(constructor);

    // const provider = Meta.getData<string>({
    //   key: SiteWideKeys.PROVIDER,
    //   targetConstructor: Controller,
    // });

    for (let handler of handlers) {
      const httpMethod = Meta.getData<string>({
        id: targetId,
        type: ProvidersTypes.CONTROLLER,
        key: SiteWideKeys.METHOD,
        propertyKey: handler,
      });

      const path = Meta.getData<string>({
        id: targetId,
        type: ProvidersTypes.CONTROLLER,
        key: SiteWideKeys.PATH,
        propertyKey: handler,
      });

      if (path) {
        console.log('Running 🚩🚩🚩🚩');
        console.log({ httpMethod, path });
      }
    }

    /// Regenerate Id
    ManageId.regenerateId({
      type: ProvidersTypes.CONTROLLER,
      prevId: ManageId.findId(ProvidersTypes.CONTROLLER) as string,
      name: constructor.name,
    });
  };
};
