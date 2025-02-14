'use server'
import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'

export const getCategories = async () => {
  const apiUrl = process.env.RESTAURANT_URL + '/category'
  const res = await apiRequest(apiUrl)
  if (res.status === 200) {
    return await res.json()
  }

  return []
}

export const getList = async (search) => {
  const mode = search.mode
  let apiUrl = process.env.RESTAURANT_URL + '/list'
  if (mode === 'current') {
    // 위치 기반이라면 주변 식당이므로 sido, sigugun 검색을 불필요
    delete search.sido
    delete search.sigugun

    apiUrl = process.env.RESTAURANT_URL + '/search'

    if (!search.lat || !search.lon) return []
  }

  const qs = toQueryString(search)
  apiUrl = `${apiUrl}${qs && qs.trim() ? '?' + qs : ''}`
  console.log('apiUrl', apiUrl)

  const res = await apiRequest(apiUrl)
  const result = await res.json()

  return result ?? []
}
