/**
 * Dados de autenticação que serão persistidos no dispositivo.
 *
 * O accessToken é usado para chamar as APIs do Google.
 * O refreshToken é usado para obter um novo accessToken
 * quando o atual expirar.
 */
export interface StoredAuthToken {
  accessToken: string;

  /**
   * Token utilizado para renovar o access token.
   *
   * Nem toda resposta OAuth necessariamente contém um
   * refresh token, por isso ele é opcional no tipo.
   */
  refreshToken?: string;

  /**
   * Tempo de vida do access token, em segundos.
   */
  expiresIn?: number;

  /**
   * Timestamp Unix, em segundos, de quando o token
   * foi recebido pelo aplicativo.
   */
  issuedAt?: number;

  /**
   * Tipo do token. Normalmente "bearer".
   */
  tokenType?: string;

  /**
   * ID Token do OpenID Connect.
   *
   * Não precisamos usá-lo para chamar APIs Google,
   * mas pode ser útil para informações de identidade.
   */
  idToken?: string;

  /**
   * Scopes efetivamente concedidos pelo Google.
   */
  scope?: string;
}

/**
 * Informações básicas do usuário autenticado.
 */
export interface AuthUser {
  id: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  picture?: string;
  emailVerified?: boolean;
}