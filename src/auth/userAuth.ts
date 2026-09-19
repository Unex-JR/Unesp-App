import {
    useContext,
} from 'react';

import { AuthContext } from './AuthProvider';

/**
 * Hook utilizado pelos componentes da aplicação
 * para acessar o estado de autenticação.
 *
 * Exemplo:
 *
 * const {
 *   user,
 *   loading,
 *   signIn,
 *   signOut,
 * } = useAuth();
 */
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de um AuthProvider.',
    );
  }

  return context;
}