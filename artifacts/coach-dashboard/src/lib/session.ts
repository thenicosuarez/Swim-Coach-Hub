import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const secret = process.env.COACH_PASSWORD;
  if (!secret) {
    throw new Error("COACH_PASSWORD environment variable is required");
  }
  return secret;
}

export function createSessionToken(): string {
  const secret = getSecret();
  return createHmac("sha256", secret).update("coach-authenticated").digest("hex");
}

export function verifySessionToken(token: string): boolean {
  try {
    const secret = getSecret();
    const expected = createHmac("sha256", secret).update("coach-authenticated").digest("hex");
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(token, "hex");
    if (expectedBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}
