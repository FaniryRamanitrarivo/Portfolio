export type ApiResponse<T> = {
  success?: boolean;
  data: T;
  message?: string;
};

const API_URL = process.env.API_URL ?? "https://silver-pancake-4j59xgvwx49h77pj-3000.app.github.dev/api";

type ApiFetchOptions = RequestInit & {
  revalidate?: number;
  tags?: string[];
};

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions
): Promise<T> {
  // const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const url = endpoint.startsWith("http")
    ? endpoint // URL complète
    : `${API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
    
  const { revalidate, tags, headers, ...rest } = options ?? {};

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    ...(revalidate !== undefined || tags
      ? {
          next: {
            ...(revalidate !== undefined ? { revalidate } : {}),
            ...(tags ? { tags } : {}),
          },
        }
      : {}),
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