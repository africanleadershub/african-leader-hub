import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type RegistrationResponseJSON,
} from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";

export function webAuthnConfig() {
  const origin = (process.env.WEBAUTHN_ORIGIN || process.env.APP_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  const rpID = process.env.WEBAUTHN_RP_ID || new URL(origin).hostname;
  return {
    rpName: "African Leaders Hub",
    rpID,
    origin,
  };
}

export async function registrationOptions(params: {
  userId: string;
  email: string;
  name: string;
  excludeCredentialIds: string[];
}) {
  const { rpName, rpID } = webAuthnConfig();
  return generateRegistrationOptions({
    rpName,
    rpID,
    userName: params.email,
    userDisplayName: params.name,
    userID: new TextEncoder().encode(params.userId),
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
    excludeCredentials: params.excludeCredentialIds.map((id) => ({
      id,
      type: "public-key",
    })),
  });
}

export async function authenticationOptions(params: { allowCredentialIds: string[] }) {
  const { rpID } = webAuthnConfig();
  return generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials: params.allowCredentialIds.map((id) => ({
      id,
      type: "public-key",
    })),
  });
}

export async function verifyRegistration(
  response: RegistrationResponseJSON,
  expectedChallenge: string
) {
  const { rpID, origin } = webAuthnConfig();
  return verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    requireUserVerification: false,
  });
}

export async function verifyAuthentication(
  response: AuthenticationResponseJSON,
  expectedChallenge: string,
  credential: { id: string; publicKey: string; counter: number; transports: string[] }
) {
  const { rpID, origin } = webAuthnConfig();
  return verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    requireUserVerification: false,
    credential: {
      id: credential.id,
      publicKey: isoBase64URL.toBuffer(credential.publicKey),
      counter: credential.counter,
      transports: credential.transports as AuthenticatorTransport[],
    },
  });
}

export function publicKeyToString(publicKey: Uint8Array): string {
  return isoBase64URL.fromBuffer(publicKey);
}

export function challengeFromClientDataJSON(clientDataJSON: string): string | null {
  try {
    const parsed = JSON.parse(
      new TextDecoder().decode(isoBase64URL.toBuffer(clientDataJSON))
    ) as { challenge?: string };
    return parsed.challenge ?? null;
  } catch {
    return null;
  }
}
