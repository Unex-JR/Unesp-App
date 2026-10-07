import * as SecureStore from 'expo-secure-store';

import type { StoredAuthToken } from './types';

/**
 * Chave utilizada para armazenar os dados de autenticação.
 *
 */
const AUTH_TOKEN_KEY = 'auth_token';

export const authStorage = {
  /**
   * Persiste os tokens de autenticação no SecureStore.
   *
   * Deve ser chamado após o login ou após um refresh
   * bem-sucedido.
   */
  async saveToken(token: StoredAuthToken): Promise<void> {
    await SecureStore.setItemAsync(
      AUTH_TOKEN_KEY,
      JSON.stringify(token),
    );
  },

  /**
   * Recupera os tokens armazenados.
   *
   * Retorna null quando não existe uma sessão persistida.
   */
  async getToken(): Promise<StoredAuthToken | null> {
    const value = await SecureStore.getItemAsync(
      AUTH_TOKEN_KEY,
    );

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as StoredAuthToken;
    } catch {
      await this.clear();

      return null;
    }
  },

  /**
   * Remove completamente a sessão persistida.
   *
   * É utilizado no logout ou quando o refresh token
   * deixa de ser válido.
   */
  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  },
};
