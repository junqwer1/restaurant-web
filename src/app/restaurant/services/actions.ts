'use server'
import apiRequest from "@/app/global/libs/apiRequest"

export const getCategories = async () => {
  const apiUrl = process.env.RESTAURANT_URL + '/category'
  const res = await apiRequest(apiUrl)
  if (res.status === 200) {
    return await res.json()
  }

  return []
}