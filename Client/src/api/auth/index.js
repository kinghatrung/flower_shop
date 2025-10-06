import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

export const refreshToken = async () => {
  return await authorizedAxiosInstance.get(`${API_URL}/api/auth/refresh-token`)
}

export const registerUser = async (newUser) => {
  const res = await authorizedAxiosInstance.post(`${API_URL}/api/auth/register`, newUser)
  return res.data
}

export const otpSend = async (email) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/otp/send`, { email })
}

export const resetPasswordUser = async (email, otp, password) => {
  return await authorizedAxiosInstance.post(`${API_URL}/api/auth/reset-password`, {
    email,
    otp,
    password
  })
}

export const deleteUser = async (email) => {
  return await authorizedAxiosInstance.delete(`${API_URL}/api/auth/delete-account`, {
    email
  })
}
