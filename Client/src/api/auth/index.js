import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async (newUser) => {
  const res = await authorizedAxiosInstance.post(`${API_URL}/api/auth/register`, newUser)
  return res.data
}

export const refreshToken = async () => {
  return await authorizedAxiosInstance.get(`${API_URL}/api/auth/refresh-token`)
}
