import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import {
  assertEnvValue,
  env,
} from '@/config/env';

WebBrowser.maybeCompleteAuthSession();

/**
 * Configura o fluxo OAuth do Google.
 *
 * Este hook é responsável apenas por configurar/iniciar
 * a autenticação. 
 * 
 */
export function useGoogleAuth() {
  const androidClientId =
    Platform.OS === 'android'
      ? assertEnvValue(
          env.google.androidClientId,
          'EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_ID',
        )
      : env.google.androidClientId;

  const iosClientId =
    Platform.OS === 'ios'
      ? assertEnvValue(
          env.google.iosClientId,
          'EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID',
        )
      : env.google.iosClientId;

  return Google.useAuthRequest({
    /**
     * Client ID específico da plataforma.
     */
    androidClientId,
    iosClientId,
    webClientId: env.google.webClientId,

    /**
     * Scopes necessários para identificar o usuário.
     *
     * - openid: habilita OpenID Connect
     * - profile: dados básicos do perfil
     * - email: endereço de e-mail
     */
    scopes: [
      'openid',
      'profile',
      'email',
    ],

    /**
     * Solicita acesso offline.
     *
     * Isso permite que o Google forneça um refresh token
     * que poderá ser usado para obter novos access tokens.
     */
    extraParams: {
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true',
    },

    /**
     * O Expo, em Android/iOS, faz automaticamente a troca
     * do authorization code pelos tokens.
     *
     */
    shouldAutoExchangeCode: true,
  });
}
