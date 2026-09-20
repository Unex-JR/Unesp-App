import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { authStorage } from './authStorage';
import { tokenService } from './tokenService';
import type { AuthUser } from './types';
import { useGoogleAuth } from './useGoogleAuth';

import { googleUserService } from '@/services/google/googleUserService';

interface AuthContextValue {
  /**
   * Usuário atualmente autenticado.
   *
   * null significa que não existe sessão.
   */
  user: AuthUser | null;

  /**
   * Indica que o aplicativo ainda está tentando
   * restaurar uma sessão existente.
   */
  loading: boolean;

  /**
   * Inicia o login Google.
   */
  signIn: () => Promise<void>;

  /**
   * Remove a sessão local.
   */
  signOut: () => Promise<void>;

  /**
   * Atualiza os dados do usuário.
   */
  refreshUser: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    request,
    response,
    promptAsync,
  ] = useGoogleAuth();

  /**
   * Inicia o fluxo OAuth.
   */
  const signIn = useCallback(async () => {
    /**
     * O useAuthRequest ainda pode estar carregando
     * quando o componente é montado.
     */
    if (!request) {
      return;
    }

    await promptAsync();
  }, [
    request,
    promptAsync,
  ]);

  /**
   * Faz logout local.
   */
  const signOut = useCallback(async () => {
    /**
     * Removemos os tokens do SecureStore.
     *
     * A partir desse momento nenhuma chamada autenticada
     * poderá obter um access token.
     */
    await authStorage.clear();

    setUser(null);
  }, []);

  /**
   * Recarrega os dados do usuário usando o access token
   * atualmente disponível.
   */
  const refreshUser = useCallback(async () => {
    const currentUser =
      await googleUserService.getCurrentUser();

    setUser(currentUser);
  }, []);

  /**
   * Processa o resultado do login Google.
   */
  useEffect(() => {
    if (!response) {
      return;
    }

    /**
     * Usuário cancelou ou o fluxo terminou sem sucesso.
     */
    if (response.type !== 'success') {
      return;
    }

    const authentication =
      response.authentication;

    if (!authentication) {
      return;
    }

    const token = authentication;

    async function completeLogin() {
      try {
        /**
         * O useAuthRequest já realizou a troca do
         * authorization code pelos tokens.
         *
         * Simplesmente persiste a resposta.
         */
        await authStorage.saveToken({
          accessToken:
            token.accessToken,

          refreshToken:
            token.refreshToken,

          expiresIn:
            token.expiresIn,

          issuedAt:
            token.issuedAt,

          tokenType:
            token.tokenType,

          idToken:
            token.idToken,

          scope:
            token.scope,
        });

        /**
         * Depois de salvar os tokens, busca
         * os dados do usuário.
         */
        const currentUser =
          await googleUserService.getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        /**
         * Se algo falhar durante o login,
         * descarta os tokens parcialmente salvos.
         */
        await authStorage.clear();

        setUser(null);

        console.error(
          'Erro ao concluir autenticação:',
          error,
        );
      }
    }

    void completeLogin();
  }, [response]);

  /**
   * Restaura a sessão quando o aplicativo inicia.
   */
  useEffect(() => {
    async function restoreSession() {
      try {
        /**
         * O tokenService decide se:
         *
         * - o access token ainda é válido;
         * - precisa ser renovado;
         * - não existe sessão.
         */
        const accessToken =
          await tokenService.getValidAccessToken();

        if (!accessToken) {
          return;
        }

        /**
         * Access token válido.
         *
         * Busca novamente os dados do usuário.
         */
        const currentUser =
          await googleUserService.getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        /**
         * Se o refresh token estiver inválido/revogado,
         * não é foi possível restaurar a sessão.
         *
         * Nesse caso, limpa os dados locais e
         * aguarda um novo login.
         */
        await authStorage.clear();

        setUser(null);

        console.error(
          'Não foi possível restaurar a sessão:',
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    void restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn,
      signOut,
      refreshUser,
    }),
    [
      user,
      loading,
      signIn,
      signOut,
      refreshUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
