import axios from 'axios'
import { toast } from 'sonner'
import { refreshToken } from '~/api'
import { logoutUser } from '~/redux/slices/authSlice'

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// Cho phép axios tự động đính kèm và gửi cookie trong mỗi request lên BE
authorizedAxiosInstance.defaults.withCredentials = true

// Can thiệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise = null

// Cam thiệp vào giữa những cái response API
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Những status code trong khoảng 2xx sẽ nằm ở trong này
    if (response.data?.message) {
      toast.success(response.data.message)
    }
    return response
  },
  (error) => {
    // Những status code ngoài khoảng 2xx sẽ nằm ở trong này - Là lỗi
    // Xử lý accessToken hết hạn
    // TH1: Nhận mã 401 từ BE, thì gọi API đăng xuất
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUser(false))
    }

    // TH2: Nhận mã 410 từ BE, thì gọi API refresh Token
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý phía be)
            return data?.accessToken
          })
          .catch((_error) => {
            // Bất kì lỗi nào từ api refresh token thì logout luôn
            axiosReduxStore.dispatch(logoutUser(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            //  Dù Api có ok hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise = null như ban đầu
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then((accessToken) => {
        // Gọi lại các Api ban đầu bị lỗi
        return authorizedAxiosInstance(originalRequests)
      })
    }

    if (error.response?.status !== 410 || error.response?.status !== 401) {
      toast.error(error.response?.data?.message)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
