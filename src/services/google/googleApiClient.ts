import { tokenService } from '@/auth/tokenService';

/**
 * Cliente HTTP mínimo para as APIs do Google.
 *
 */
export const googleApiClient = {
  /**
   * Executa uma requisição autenticada para uma API Google.
   *
   * O access token é obtido através do tokenService,
   * garantindo que ele esteja válido antes da requisição.
   */
  async request<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const accessToken =
      await tokenService.getValidAccessToken();

    if (!accessToken) {
      throw new Error(
        'Usuário não autenticado.',
      );
    }

    const headers = new Headers(
      options.headers,
    );

    headers.set(
      'Authorization',
      `Bearer ${accessToken}`,
    );

    if (options.body) {
      headers.set(
        'Content-Type',
        'application/json',
      );
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    /**
     * Caso o Google rejeite o access token mesmo depois
     * da verificação de validade, tenta fazer
     * um refresh e repetir a requisição uma única vez.
     */
    if (response.status === 401) {
      const refreshedToken =
        await tokenService.refresh();

      headers.set(
        'Authorization',
        `Bearer ${refreshedToken}`,
      );

      const retryResponse = await fetch(url, {
        ...options,
        headers,
      });

      if (!retryResponse.ok) {
        throw new Error(
          `Google API error: ${retryResponse.status}`,
        );
      }

      if (retryResponse.status === 204) {
        return undefined as T;
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      throw new Error(
        `Google API error: ${response.status}`,
      );
    }

    /**
     * Algumas APIs podem retornar 204.
     */
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  },

  /**
   * Atalho para GET.
   */
  async get<T>(url: string): Promise<T> {
    return this.request<T>(url);
  },

  /**
   * Atalho para POST.
   */
  async post<T>(
    url: string,
    body: unknown,
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  /**
   * Atalho para PUT.
   */
  async put<T>(
    url: string,
    body: unknown,
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  /**
   * Atalho para DELETE.
   */
  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  },
};
