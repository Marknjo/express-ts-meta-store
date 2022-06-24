import { AppUtils } from '../../library/helpers/Utils';
import { ManageId } from '../../stores/idManager';

import { Meta } from '../../stores/meta';
import { GenericConstructor, ProvidersTypes, AppMetaKeys } from '../../types';

export const Controller = function () {
  return function (constructor: GenericConstructor) {
    /// Update constructor meta (TargetConstructor and constructorName)
    Meta.define<string>({
      metaKey: AppMetaKeys.BASE_CONSTRUCTOR,
      metaType: ProvidersTypes.CONTROLLER,
      targetConstructor: constructor,
      constructorName: constructor.name,
    });

    // Generate Id if not declared
    const targetId = ManageId.findId(ProvidersTypes.CONTROLLER) as string;

    // console.log(
    //   `Controller :(${constructor.name}): running... 🚩🚩🚩🚩🚩 . Constructor: `,
    //   constructor,
    //   genetatedId
    // );

    const foundProperties = Meta.getPropertiesKeysMeta(
      targetId,
      ProvidersTypes.CONTROLLER
    );

    console.log('Found properties: ', foundProperties);

    const handlers = AppUtils.getControllerHandlers(constructor);

    for (let handler of handlers) {
      const httpMethod = Meta.getData<string>({
        id: targetId,
        metaType: ProvidersTypes.CONTROLLER,
        metaKey: AppMetaKeys.METHOD,
        propertyKey: handler,
      });

      const path = Meta.getData<string>({
        id: targetId,
        metaType: ProvidersTypes.CONTROLLER,
        metaKey: AppMetaKeys.PATH,
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
