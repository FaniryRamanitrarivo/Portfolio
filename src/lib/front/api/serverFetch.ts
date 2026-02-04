// src/lib/front/api/serverApi.ts
export type ApiResponse<T> = {
  success?: boolean;
  data: T;
  message?: string;
};

/**
 * fetch générique côté serveur
 */
export async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const domainUrl = process.env.NEXT_PUBLIC_API_URL || 'https://silver-pancake-4j59xgvwx49h77pj-3000.app.github.dev/';
  const url = `${domainUrl}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    next: options?.revalidate
      ? { revalidate: options.revalidate }
      : undefined,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}
