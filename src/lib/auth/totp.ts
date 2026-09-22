import { Secret, TOTP } from "otpauth";
import QRCode from "qrcode";

const ISSUER = "African Leaders Hub";

function totpFor(secret: string, email: string) {
  return new TOTP({
    issuer: ISSUER,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
}

export function generateTotpSecret(): string {
  return new Secret({ size: 20 }).base32;
}

export function totpUri(secret: string, email: string): string {
  return totpFor(secret, email).toString();
}

export async function totpQrDataUrl(secret: string, email: string): Promise<string> {
  return QRCode.toDataURL(totpUri(secret, email), {
    margin: 1,
    width: 220,
    color: { dark: "#8B4513", light: "#ffffff" },
  });
}

export function verifyTotp(secret: string, token: string, email: string): boolean {
  const delta = totpFor(secret, email).validate({ token: token.replace(/\s/g, ""), window: 1 });
  return delta !== null;
}
