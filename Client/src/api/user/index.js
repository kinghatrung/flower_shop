import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async (limit, page) => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/users`, {
    params: { limit, page }
  })
  return res.data
}

export const updateUser = async (userId, updatedFields) => {
  return await authorizedAxiosInstance.patch(
    `${API_URL}/api/users/edit-user/${userId}`,
    updatedFields
  )
}
