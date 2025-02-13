export const toQueryString = (data: object) => {
  const qs = []
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((v) => qs.push(`${key}=${v}`))
    } else {
      qs.push(`${key}=${value}`)
    }
  }

  return qs.join('&')
}

export const fetcher = (url) => fetch(url).then((r) => r.json())