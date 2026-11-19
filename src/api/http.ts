const API_URL = import.meta.env.VITE_API_URL ?? ''

function errorMessage(body: unknown, fallback: string): string {
  const detail = (body as { detail?: unknown })?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    const messages = detail
      .map((d: { msg?: string }) => (d.msg ?? '').replace(/^Value error, /, ''))
      .filter(Boolean)
    if (messages.length > 0) return messages.join('; ')
  }
  return fallback
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(`${API_URL}${path}`, init)
  const body = await resp.json().catch(() => null)
  if (!resp.ok) throw new Error(errorMessage(body, `Ошибка ${resp.status}`))
  return body as T
}

export function withJson(method: string, data?: unknown): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data),
  }
}
