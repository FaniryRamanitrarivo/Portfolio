import type { CacheConfig } from "./types";

/**
 * Configurations de cache pour les différents types de requêtes
 */
export const CACHE_CONFIG = {
  /**
   * Cache court moyen terme : utile pour les données qui changent régulièrement
   * Revalidation toutes les 60 secondes
   */
  STANDARD: {
    revalidate: 60,
    tags: ["projects"],
  } as const satisfies CacheConfig,

  /**
   * Cache court terme : pour les données très dynamiques
   * Revalidation toutes les 10 secondes
   */
  SHORT: {
    revalidate: 10,
    tags: ["projects"],
  } as const satisfies CacheConfig,

  /**
   * Cache long terme : pour les données statiques
   * Revalidation une fois par jour
   */
  LONG: {
    revalidate: 86400,
    tags: ["projects"],
  } as const satisfies CacheConfig,

  /**
   * Pas de cache : données temps réel
   */
  NONE: {
    revalidate: 0,
    tags: ["projects"],
  } as const satisfies CacheConfig,
} as const;
