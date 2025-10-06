import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async () => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products`)
  return res.data
}
