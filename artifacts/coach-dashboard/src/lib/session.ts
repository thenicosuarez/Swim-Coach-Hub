import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  return process.env.COACH_PASSWORD ?? "dev-secret-changeme";
}

export function createSessionToken(): string {
  const secret = getSecret();
  return createHmac("sha256", secret).update("coach-authenticated").digest("hex");
}

export function verifySessionToken(token: string): boolean {
  try {
    const expected = createSessionToken();
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(token, "hex");
    if (expectedBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}
