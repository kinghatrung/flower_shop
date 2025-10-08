import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products?${params}`)
  return res.data
}
