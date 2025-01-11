const CACHE_KEY = 'shiftManagementCache'
    const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

    export const saveToCache = (data) => {
      const cacheData = {
        timestamp: Date.now(),
        data
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    }

    export const loadFromCache = () => {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (!cachedData) return null

      const { timestamp, data } = JSON.parse(cachedData)
      const isCacheValid = (Date.now() - timestamp) < CACHE_DURATION

      return isCacheValid ? data : null
    }

    export const clearCache = () => {
      localStorage.removeItem(CACHE_KEY)
    }

    export const getCacheStatus = () => {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (!cachedData) return 'empty'

      const { timestamp } = JSON.parse(cachedData)
      const isCacheValid = (Date.now() - timestamp) < CACHE_DURATION

      return isCacheValid ? 'active' : 'expired'
    }
