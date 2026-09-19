export const env = {
  google: {
    androidClientId:
      process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_ID ??
      process.env.GOOGLE_OAUTH_ANDROID_ID,
    iosClientId:
      process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID ??
      process.env.GOOGLE_OAUTH_IOS_CLIENT_ID,
    webClientId:
      process.env.EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID ??
      process.env.GOOGLE_OAUTH_WEB_CLIENT_ID,
  },
} as const;

export function assertEnvValue(
  value: string | undefined,
  name: string,
): string {
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}.`,
    );
  }

  return value;
}
