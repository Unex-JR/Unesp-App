import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';

import {
  assertEnvValue,
  env,
} from '@/config/env';
import { authStorage } from './authStorage';
import type { StoredAuthToken } from './types';

/**
 * Endpoint oficial de tokens do Google.
 *
 */
const GOOGLE_TOKEN_ENDPOINT =
  'https://oauth2.googleapis.com/token';

/**
 * Discovery mínimo necessário pelo expo-auth-session
 * para executar refreshAsync().
 */
const GOOGLE_DISCOVERY = {
  tokenEndpoint: GOOGLE_TOKEN_ENDPOINT,
};

let refreshPromise: Promise<string> | null = null;

/**
 * Retorna o Client ID correspondente à plataforma atual.
 */
function getClientId(): string {
  if (Platform.OS === 'ios') {
    return assertEnvValue(
      env.google.iosClientId,
      'EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID',
    );
  }

  if (Platform.OS === 'android') {
    return assertEnvValue(
      env.google.androidClientId,
      'EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_ID',
    );
  }

  return assertEnvValue(
    env.google.webClientId,
    'EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID',
  );
}

/**
 * Converte o TokenResponse do Expo para o modelo
 * persistido no SecureStore.
 */
function toStoredToken(
  response: AuthSession.TokenResponse,
  previousToken?: StoredAuthToken | null,
): StoredAuthToken {
  return {
    accessToken: response.accessToken,

    /**
     * O Google pode não devolver outro refresh token durante
     * o refresh.
     *
     * Nesse caso, preservamos o refresh token anterior.
     */
    refreshToken:
      response.refreshToken ??
      previousToken?.refreshToken,

    expiresIn: response.expiresIn,
    issuedAt: response.issuedAt,
    tokenType: response.tokenType,
    idToken: response.idToken,
    scope: response.scope,
  };
}

export const tokenService = {
  /**
   * Retorna um access token válido.
   *
   * Fluxo:
   *
   * 1. Busca os tokens no SecureStore.
   * 2. Verifica se o access token ainda está válido.
   * 3. Se estiver válido, retorna o token atual.
   * 4. Se estiver expirado/próximo de expirar, executa refresh.
   * 5. Persiste os novos tokens.
   */
  async getValidAccessToken(): Promise<string | null> {
    const storedToken = await authStorage.getToken();

    if (!storedToken) {
      return null;
    }

    const isFresh = AuthSession.TokenResponse.isTokenFresh(
      {
        expiresIn: storedToken.expiresIn,
        issuedAt: storedToken.issuedAt ?? 0,
      },
      /**
       * Margem de segurança de 60 segundos.
       *
       * Se faltar menos de 60 segundos para expirar
       * o token é considerado inadequado para uma nova operação.
       */
      60,
    );

    if (isFresh) {
      return storedToken.accessToken;
    }

    /**
     * O access token precisa ser renovado.
     */
    return this.refresh();
  },

  /**
   * Obtém um novo access token utilizando o refresh token.
   */
  async refresh(): Promise<string> {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = this.performRefresh().finally(() => {
      refreshPromise = null;
    });

    return refreshPromise;
  },

  async performRefresh(): Promise<string> {
    const storedToken = await authStorage.getToken();

    if (!storedToken?.refreshToken) {
      /**
       * Não temos como renovar a sessão.
       *
       * O AuthProvider deverá interpretar esse erro
       * como uma sessão que precisa ser autenticada novamente.
       */
      throw new Error(
        'Refresh token não encontrado.',
      );
    }

    /**
     * O Expo executa:
     *
     * POST https://oauth2.googleapis.com/token
     *
     * com grant_type=refresh_token.
     */
    const response = await AuthSession.refreshAsync(
      {
        clientId: getClientId(),
        refreshToken: storedToken.refreshToken,
      },
      GOOGLE_DISCOVERY,
    );

    /**
     * Converte a resposta para o formato utilizado
     * internamente pela aplicação.
     */
    const updatedToken = toStoredToken(
      response,
      storedToken,
    );

    /**
     * Substitui o access token antigo.
     *
     * O refresh token anterior é preservado caso o Google
     * não envie outro na resposta.
     */
    await authStorage.saveToken(updatedToken);

    return updatedToken.accessToken;
  },
};
