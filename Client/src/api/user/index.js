import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async (limit, page) => {
  const res = await authorizedAxiosInstance.get(`${API_URL}/api/users`, {
    params: { limit, page }
  })
  return res.data
}
