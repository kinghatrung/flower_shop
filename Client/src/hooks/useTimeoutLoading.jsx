import { useState, useCallback } from 'react'

function useTimeoutLoading(delay = 500) {
  const [isActive, setIsActive] = useState(false)
  const start = useCallback(() => {
    setIsActive(true)
    const timer = setTimeout(() => {
      setIsActive(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return [isActive, start]
}

export default useTimeoutLoading
