export enum ParamsDecoratorsKeys {
  REQ = 'req',
  RES = 'res',
  NEXT = 'nextFunction',
  LOCALS = 'locals',
  SET_REDIRECT = 'setRedirect',

  GET_BODY = 'getRequestBody',
  GET_PARAMS = 'getParams',
  GET_QUERY_STRINGS = 'getQueryStrings',

  GET_ORIGINAL_URL = 'getOriginalUrl',
  GET_PATH = 'getPath',
  GET_BASE_URL = 'getBaseUrl',

  GET_PROTOCOL = 'getProtocol',
  GET_HOSTNAME = 'getHostname',
  GET_REQ_GETTER = 'getReqGetter',

  GET_IP = 'getIp',
  GET_IPS = 'getIps',
  GET_SUBDOMAINS = 'getSubdomains',

  IS_SECURE = 'isSecure',
  IS_STALE = 'isStale',
  IS_FRESH = 'isFresh',
  IS_XHR = 'isXhr',

  /// COOKIES
  SET_COOKIE = 'setCookie',
  GET_COOKIES = 'getCookies',
  CLEAR_COOKIE = 'clearCookie',
  GET_SIGNED_COOKIE = 'getSignedCookie',
  GET_SESSION = 'getSession',
}
