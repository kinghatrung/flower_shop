import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async () => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/users`)
  return res.data
}
