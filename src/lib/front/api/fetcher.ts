// src/lib/api/fetcher.ts

export type ApiResponse<T> = {
  success?: boolean;
  data: T;
  message?: string;
};

const API_URL =
  process.env.API_URL ??
  "https://silver-pancake-4j59xgvwx49h77pj-3000.app.github.dev/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {

  const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
    next: options?.revalidate
      ? { revalidate: options.revalidate }
      : undefined,
  });

  let json: ApiResponse<T>;

  try {
    json = await res.json();
  } catch {
    throw new Error("Invalid JSON response");
  }

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `API error ${res.status}`);
  }

  return json.data;
}