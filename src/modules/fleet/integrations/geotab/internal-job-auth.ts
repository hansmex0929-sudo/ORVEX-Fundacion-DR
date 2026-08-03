function constantTimeEqual(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  const length = Math.max(a.length, b.length);
  let difference = a.length ^ b.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (a[index] ?? 0) ^ (b[index] ?? 0);
  }

  return difference === 0;
}

function parseBearerToken(authorization: string): string {
  const match = /^Bearer[ \t]+([^ \t]+)[ \t]*$/i.exec(authorization);
  return match?.[1] ?? "";
}

export function assertInternalGeotabJob(request: Request): void {
  const expected = process.env.ORVEX_INTERNAL_JOB_TOKEN;
  if (!expected) throw new Error("INTERNAL_JOB_TOKEN_NOT_CONFIGURED");

  const authorization = request.headers.get("authorization") ?? "";
  const supplied = parseBearerToken(authorization);

  if (!supplied || !constantTimeEqual(supplied, expected)) {
    throw new Error("INTERNAL_JOB_UNAUTHORIZED");
  }
}
