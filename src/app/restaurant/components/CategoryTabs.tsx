'use client'
import React, { useState, useLayoutEffect } from 'react'
import { getCategories } from '../services/actions'

const CategoryTabs = ({ categories, onClick }) => {
  const [items, setItems] = useState<string[]>()

  useLayoutEffect(() => {
    ;(async () => {
      const data = await getCategories()
      setItems(data)
    })()
  }, [])
  return <></>
}

export default React.memo(CategoryTabs)
