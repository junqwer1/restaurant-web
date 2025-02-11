'use client'
import React, { useState, useCallback, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import SearchForm from '../components/SearchForm'
import KakaoMap from '@/app/global/components/KakaoMap'
import RestaurantItems from '../components/RestaurantItems'

type SearchType = {
  sido?: string
  sigugun?: string
  category?: string[]
  sort?: string
  lat?: number
  lon?: number
  limit?: number
}

const RestaurantContainer = () => {
  const [search, setSearch] = useState<SearchType | undefined>()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {}, [categories]) // 분류가 변경될때 마다 바로바로 조회 내용 반영

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
