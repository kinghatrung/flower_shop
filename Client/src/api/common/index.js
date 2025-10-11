import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

// USERS
export const getUsers = async (page, limit, filters = {}) => {
  const params = new URLSearchParams({
    page,
    limit,
    ...filters
  }).toString()

  const res = await authorizedAxiosInstance.get(`${API_URL}/api/users?${params}`)
  return res.data
}

export const updateUser = async (userId, updatedFields) => {
  return await authorizedAxiosInstance.patch(`${API_URL}/api/users/edit/${userId}`, updatedFields)
}

// PRODUCTS
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products?${params}`)
  return res.data
}

// CATEGORIES
export const getCategories = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/categories?${params}`)
  return res.data
}

export const deleteCategory = async (type) => {
  return await authorizedAxiosInstance.delete(`${API_URL}/api/categories/delete`, {
    data: { type }
  })
}

export const createCategory = async (data) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/categories/post`, data)
}

export const editCategory = async (idCategory, data) => {
  return await authorizedAxiosInstance.patch(`${API_URL}/api/categories/edit/${idCategory}`, data)
}
