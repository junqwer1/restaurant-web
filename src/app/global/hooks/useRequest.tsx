'use client'
import useSWR from 'swr'
import { fetcher } from '../libs/utils'

export default function useRequest(url) {
  return useSWR(url, fetcher)
}