export enum ParamsDecoratorsActions {
  HAS_REDIRECT = 'hasRedirect',
  HAS_LOCALS = 'hasLocals',
  HAS_NEXT = 'hasNextFunction',
  HAS_REQ = 'hasRequest',
  HAS_RES = 'hasResponse',

  HAS_BODY = 'hasBody',

  /// URL GETTERS
  HAS_PARAMS = 'hasParams',
  HAS_QUERY_STRINGS = 'hasQueryStrings',

  HAS_ORIGINAL_URL = 'hasOriginalUrl',
  HAS_PATH = 'hasPath',
  HAS_BASE_URL = 'hasBaseUrl',

  HAS_PROTOCOL = 'hasProtocol',
  HAS_HOSTNAME = 'hasHostname',

  /// Request methods
  HAS_REQ_GETTER = 'hasReqGetter',

  /// IPS
  HAS_IP = 'hasIp',
  HAS_IPS = 'hasIps',
  HAS_SUBDOMAINS = 'hasSubdomains',

  /// CHECKS
  HAS_IS_SECURE = 'hasIsSecure',
  HAS_IS_STALE = 'hasIsStale',
  HAS_IS_FRESH = 'hasIsFresh',
  HAS_IS_XHR = 'hasIsXhr',

  /// COOKIES
  HAS_SET_COOKIE = 'hasSetCookie',
  HAS_COOKIES = 'hasCookies',
  HAS_CLEAR_COOKIE = 'hasClearCookie',
  HAS_SIGNED_COOKIE = 'hasSignedCookie',
  HAS_SESSION = 'hasSession',
}
