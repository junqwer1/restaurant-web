'use client'
import React, { useState, useCallback, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import SearchForm from '../components/SearchForm'
import KakaoMap from '@/app/global/components/KakaoMap'
import RestaurantItems from '../components/RestaurantItems'
import { getList } from '../services/actions'
import { List } from 'react-content-loader'

const Loading = () => <List />

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
  const [_search, _setSearch] = useState<SearchType>({ mode: 'current' })
  const [categories, setCategories] = useState<string[]>([])
  const [items, setItems] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      console.log('search', search)
      setLoading(true)
      const _items = await getList(search)
      setItems(_items)
      console.log('_items', _items)
      setLoading(false)
    })()
  }, [search])

  useEffect(() => {
    setSearch((search) => ({ ...search, category: categories }))
  }, [categories]) // 분류가 변경될때 마다 바로바로 조회 내용 반영

  useEffect(() => {
    console.log('search', search)
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
    _setSearch((search) => ({ ...search, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    _setSearch((search) => ({ ...search, [field]: value }))
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

    setSearch(_search)
  }, [_search])

  const onMoveToLocation = useCallback((lat, lon) => {}, [])

  return (
    <>
      <CategoryTabs categories={categories} onClick={onTabClick} />
      <SearchForm
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      <KakaoMap />
      {loading ? (
        <Loading />
      ) : (
        <RestaurantItems items={items} onClick={onMoveToLocation} />
      )}
    </>
  )
}

export default React.memo(RestaurantContainer)
