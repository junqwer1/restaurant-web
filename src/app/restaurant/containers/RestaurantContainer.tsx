'use client'
import React, { useState, useCallback, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import SearchForm from '../components/SearchForm'
import KakaoMap from '@/app/global/components/KakaoMap'
import RestaurantItems from '../components/RestaurantItems'
import { getList } from '../services/actions'

type SearchType = {
  mode: 'current' | 'search'
  sido?: string
  sigugun?: string
  category?: string[]
  sort?: string
  lat?: number
  lon?: number
  limit?: number
}

const RestaurantContainer = () => {
  const [search, setSearch] = useState<SearchType>({ mode: 'current' })
  const [categories, setCategories] = useState<string[]>([])
  const [items, setItems] = useState<any>([])

  useEffect(() => {
    
  }, [search])

  useEffect(() => {
    setSearch(search => ({...search, category: categories}))
  }, [categories]) // 분류가 변경될때 마다 바로바로 조회 내용 반영

  useEffect(() => {
    const { mode, limit, lat, lon } = search
    if (mode === 'current' && !lat && !lon) {
      //위치 기반일 때 현재 사용자의 위도, 경도 좌표 조회
      navigator.geolocation.getCurrentPosition((pos) => {
        setSearch((search) => ({
          ...search,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          limit: limit < 1 ? 50 : limit,
        }))
      })
    }
  }, [search])

  const onChange = useCallback((e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }))
  }, [])

  const onTabClick = useCallback((category) => {
    setCategories((categories) => {
      const set = new Set(categories)
      if (set.has(category)) {
        set.delete(category)
      } else {
        set.add(category)
      }

      return [...set.values()]
    })
  }, [])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <>
      <CategoryTabs categories={categories} onClick={onTabClick} />
      <SearchForm form={search} onChange={onChange} onSubmit={onSubmit} />
      <KakaoMap />
      <RestaurantItems />
    </>
  )
}

export default React.memo(RestaurantContainer)
