import type { AuthUser } from '@/auth/types';
import { googleApiClient } from './googleApiClient';

/**
 * Resposta original do endpoint UserInfo do Google.
 */
interface GoogleUserInfoResponse {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
}

/**
 * Endpoint OIDC UserInfo do Google.
 */
const USERINFO_URL =
  'https://openidconnect.googleapis.com/v1/userinfo';

export const googleUserService = {
  /**
   * Busca os dados do usuário atualmente autenticado.
   * Solicita ao tokenService um access token válido.
   * 
   */
  async getCurrentUser(): Promise<AuthUser> {
    const data =
      await googleApiClient.get<GoogleUserInfoResponse>(
        USERINFO_URL,
      );

    /**
     * Traduz o modelo específico do Google
     * para o modelo utilizado pela a aplicação.
     */
    return {
      id: data.sub,
      name: data.name,
      givenName: data.given_name,
      familyName: data.family_name,
      email: data.email,
      picture: data.picture,
      emailVerified: data.email_verified,
    };
  },
};
