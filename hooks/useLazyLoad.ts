import { useEffect, useState, useCallback } from 'react'

export function useLazyLoad<T>(
  fetchData: () => Promise<T[]>,
  pageSize: number = 10
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newData = await fetchData()
      if (newData.length < pageSize) {
        setHasMore(false)
      }
      setData(prev => [...prev, ...newData])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setLoading(false)
    }
  }, [fetchData, loading, hasMore, pageSize])

  return { data, loading, hasMore, loadMore }
} 