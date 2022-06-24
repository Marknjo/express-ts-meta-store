/// Imports
import { Meta } from '../../../stores/meta';
import { ProvidersTypes } from '../../../types';
import { ParamsDecoratorsKeys, ParamsDecoratorsActions } from '../types';

/// Define middleware decorator
export const parametersBinder = function (feature: any, featureCheck: string) {
  return function (_: any, handler: string, position: number) {
    Meta.define<{ [key: string]: boolean | number }>({
      metaKey: feature,
      metaValue: { position, [featureCheck]: true },
      metaType: ProvidersTypes.CONTROLLER,
      propertyKey: handler,
    });
  };
};

export const Req = parametersBinder(
  ParamsDecoratorsKeys.REQ,
  ParamsDecoratorsActions.HAS_REQ
);

export const Res = parametersBinder(
  ParamsDecoratorsKeys.RES,
  ParamsDecoratorsActions.HAS_RES
);

export const Next = parametersBinder(
  ParamsDecoratorsKeys.NEXT,
  ParamsDecoratorsActions.HAS_NEXT
);

export const SetLocals = parametersBinder(
  ParamsDecoratorsKeys.LOCALS,
  ParamsDecoratorsActions.HAS_LOCALS
);

export const SetRedirect = parametersBinder(
  ParamsDecoratorsKeys.SET_REDIRECT,
  ParamsDecoratorsActions.HAS_REDIRECT
);

export const GetRequestBody = parametersBinder(
  ParamsDecoratorsKeys.GET_BODY,
  ParamsDecoratorsActions.HAS_BODY
);

export const GetParams = parametersBinder(
  ParamsDecoratorsKeys.GET_PARAMS,
  ParamsDecoratorsActions.HAS_PARAMS
);

export const GetQueryStrings = parametersBinder(
  ParamsDecoratorsKeys.GET_QUERY_STRINGS,
  ParamsDecoratorsActions.HAS_QUERY_STRINGS
);

export const GetOriginalUrl = parametersBinder(
  ParamsDecoratorsKeys.GET_ORIGINAL_URL,
  ParamsDecoratorsActions.HAS_ORIGINAL_URL
);

export const GetPath = parametersBinder(
  ParamsDecoratorsKeys.GET_PATH,
  ParamsDecoratorsActions.HAS_PATH
);

export const GetBaseUrl = parametersBinder(
  ParamsDecoratorsKeys.GET_BASE_URL,
  ParamsDecoratorsActions.HAS_BASE_URL
);

export const GetProtocol = parametersBinder(
  ParamsDecoratorsKeys.GET_PROTOCOL,
  ParamsDecoratorsActions.HAS_PROTOCOL
);

export const GetHostname = parametersBinder(
  ParamsDecoratorsKeys.GET_HOSTNAME,
  ParamsDecoratorsActions.HAS_HOSTNAME
);

/// IPS
export const GetIp = parametersBinder(
  ParamsDecoratorsKeys.GET_IP,
  ParamsDecoratorsActions.HAS_IP
);

export const GetIps = parametersBinder(
  ParamsDecoratorsKeys.GET_IPS,
  ParamsDecoratorsActions.HAS_IPS
);

export const GetSubdomains = parametersBinder(
  ParamsDecoratorsKeys.GET_SUBDOMAINS,
  ParamsDecoratorsActions.HAS_SUBDOMAINS
);

/// CHECKS
export const IsSecure = parametersBinder(
  ParamsDecoratorsKeys.IS_SECURE,
  ParamsDecoratorsActions.HAS_IS_SECURE
);

export const IsXhr = parametersBinder(
  ParamsDecoratorsKeys.IS_XHR,
  ParamsDecoratorsActions.HAS_IS_XHR
);

export const IsStale = parametersBinder(
  ParamsDecoratorsKeys.IS_STALE,
  ParamsDecoratorsActions.HAS_IS_STALE
);

export const IsFresh = parametersBinder(
  ParamsDecoratorsKeys.IS_FRESH,
  ParamsDecoratorsActions.HAS_IS_FRESH
);

/// METHODS - REQUEST
export const GetReqGetter = parametersBinder(
  ParamsDecoratorsKeys.GET_REQ_GETTER,
  ParamsDecoratorsActions.HAS_REQ_GETTER
);

/// COOKIES
export const SetCookie = parametersBinder(
  ParamsDecoratorsKeys.SET_COOKIE,
  ParamsDecoratorsActions.HAS_SET_COOKIE
);

export const GetCookies = parametersBinder(
  ParamsDecoratorsKeys.GET_COOKIES,
  ParamsDecoratorsActions.HAS_COOKIES
);

export const GetSignedCookie = parametersBinder(
  ParamsDecoratorsKeys.GET_SIGNED_COOKIE,
  ParamsDecoratorsActions.HAS_SIGNED_COOKIE
);

export const ClearCookie = parametersBinder(
  ParamsDecoratorsKeys.CLEAR_COOKIE,
  ParamsDecoratorsActions.HAS_CLEAR_COOKIE
);

///// THIRD PARTY SUPPORT

/// SUpport of cookie-session middleware
export const GetSession = parametersBinder(
  ParamsDecoratorsKeys.GET_SESSION,
  ParamsDecoratorsActions.HAS_SESSION
);
