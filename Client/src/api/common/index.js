import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products?${params}`)
  return res.data
}

export const gerCategories = async () => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/categories`)
  return res.data
}

export const deleteCategory = async (type) => {
  return await authorizedAxiosInstance.delete(`${API_URL}/api/categories/delete`, {
    data: { type }
  })
}
