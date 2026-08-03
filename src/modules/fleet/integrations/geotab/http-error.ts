export type GeotabHttpError = {
  status: 400 | 401 | 403 | 500 | 503;
  code: string;
};

const STABLE_ERROR_CODE = /^[A-Z][A-Z0-9_]{2,80}$/;

function statusForCode(code: string): GeotabHttpError["status"] {
  if (/(?:^|_)(?:UNAUTHORIZED|AUTHENTICATION_REQUIRED)$/.test(code)) return 401;
  if (/(?:^|_)(?:FORBIDDEN|PERMISSION_DENIED|ACCESS_DENIED)$/.test(code)) return 403;
  if (
    /(?:^|_)(?:NOT_CONFIGURED|UNAVAILABLE|TIMEOUT|CONNECTION_FAILED|PROVIDER_FAILED|DATABASE_FAILED)$/.test(
      code,
    )
  ) {
    return 503;
  }
  if (/(?:^|_)(?:INVALID|MALFORMED|NOT_ALLOWED)(?:_|$)/.test(code)) return 400;
  return 500;
}

export function toGeotabHttpError(
  error: unknown,
  fallbackCode: string,
): GeotabHttpError {
  const message = error instanceof Error ? error.message.trim() : "";
  const code = STABLE_ERROR_CODE.test(message) ? message : fallbackCode;

  return {
    status: statusForCode(code),
    code,
  };
}
