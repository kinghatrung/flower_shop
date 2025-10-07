import { useSearchParams } from 'react-router-dom'

function useQueryParams() {
  const [params] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...params])

  return searchParamsObject
}

export default useQueryParams
