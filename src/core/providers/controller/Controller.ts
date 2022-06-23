import { AppUtils } from '../../library/helpers/Utils';
import { ManageId } from '../../stores/idManager';

import { Meta } from '../../stores/meta';
import { GenericConstructor, ProvidersTypes, SiteWideKeys } from '../../types';

export const Controller = function () {
  return function (constructor: GenericConstructor) {
    // Generate Id if not declared
    const genetatedId = ManageId.generateId(ProvidersTypes.CONTROLLER);

    console.log(
      `Controller :(${constructor.name}): running... 🚩🚩🚩🚩🚩 . Constructor: `,
      constructor,
      genetatedId
    );

    const handlers = AppUtils.getControllerHandlers(constructor);

    // const provider = Meta.getData<string>({
    //   key: SiteWideKeys.PROVIDER,
    //   targetConstructor: Controller,
    // });

    for (let handler of handlers) {
      const httpMethod = Meta.getData<string>({
        key: SiteWideKeys.METHOD,
        id: genetatedId,
        method: handler,
      });

      const path = Meta.getData<string>({
        key: SiteWideKeys.PATH,
        id: genetatedId,
        method: handler,
      });

      if (path && handler) {
        console.log(httpMethod, path);
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
