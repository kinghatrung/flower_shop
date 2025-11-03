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
export const getProducts = async (page, limit, filters = {}) => {
  const params = new URLSearchParams({ page, limit, ...filters }).toString()
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products?${params}`)
  return res.data
}

export const getProductsByCategoryId = async (id) => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products/category/${id}`)
  return res.data
}

export const getProductsAll = async () => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products/all`)
  return res.data
}

export const getProduct = async (id) => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/products/product/${id}`)
  return res.data
}

export const createProduct = async (productData) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/products/post`, productData)
}

export const editProduct = async (productId, newProductData) => {
  return await authorizedAxiosInstance.patch(
    `${API_URL}/api/products/edit/${productId}`,
    newProductData
  )
}

export const deleteProductById = async (productId) => {
  return await authorizedAxiosInstance.delete(`${API_URL}/api/products/delete/${productId}`)
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

// SEND EMAIL
export const sendEmail = async (data) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/email/send`, data)
}

// UPLOAD IMAGES
export const uploadImage = async (formData) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/upload/images`, formData)
}

// CART USER
export const getProductCart = async (userId) => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/cart/${userId}`)
  return res.data
}

export const createProductCartUser = async (payload) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/cart/create`, payload)
}

export const updateProductCartUser = async (payload) => {
  const res = await authorizedAxiosInstance.put(`${API_URL}/api/cart/update`, payload)
  return res.data
}

export const deleteProductCartUser = async (userId, productId) => {
  return await authorizedAxiosInstance.delete(`${API_URL}/api/cart/delete/${productId}`, {
    data: { userId }
  })
}

// ORDER PRODUCTS
export const createOrder = async (payload) => {
  const res = await authorizedAxiosInstance.post(`${API_URL}/api/orders/create`, payload)
  return res.data
}

export const getOrders = async () => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/orders`)
  return res.data
}
