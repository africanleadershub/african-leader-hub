import {
  startAuthentication,
  startRegistration,
  type PublicKeyCredentialCreationOptionsJSON,
  type PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/browser";

function passkeyError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.name === "NotAllowedError" || error.name === "AbortError") {
      return new Error("Passkey request was cancelled");
    }
    return error;
  }
  return new Error("Passkey request failed");
}

export async function registerBrowserPasskey(options: PublicKeyCredentialCreationOptionsJSON) {
  try {
    return await startRegistration({ optionsJSON: options });
  } catch (error) {
    throw passkeyError(error);
  }
}

export async function authenticateBrowserPasskey(options: PublicKeyCredentialRequestOptionsJSON) {
  try {
    return await startAuthentication({ optionsJSON: options });
  } catch (error) {
    throw passkeyError(error);
  }
}
