export const errorText = (err: unknown, fallback = 'Неизвестная ошибка') =>
  err instanceof Error ? err.message : fallback
