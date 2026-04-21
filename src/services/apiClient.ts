const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'https://jsonplaceholder.typicode.com'
const REQUEST_TIMEOUT_MS = 10000

async function withTimeout(input: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>
}

function getErrorDetails(res: Response, path: string, method: string): Error {
  return new Error(`${method} ${path} failed: ${res.status} ${res.statusText}`)
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await withTimeout(`${BASE_URL}${path}`)
  if (!res.ok) throw getErrorDetails(res, path, 'GET')
  return parseJson<T>(res)
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await withTimeout(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw getErrorDetails(res, path, 'POST')
  return parseJson<T>(res)
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await withTimeout(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw getErrorDetails(res, path, 'PUT')
  return parseJson<T>(res)
}

export async function apiDelete(path: string): Promise<void> {
  const res = await withTimeout(`${BASE_URL}${path}`, { method: 'DELETE' })
  if (!res.ok) throw getErrorDetails(res, path, 'DELETE')
}


