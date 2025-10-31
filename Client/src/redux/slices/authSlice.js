import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
const API_URL = import.meta.env.VITE_API_URL

// Các hành động gọi API bất đồng bộ và cập nhập dữ liệu và Redux,
//  có thể dùng Middleware createAsyncThunk đi kèm với extraReducer

export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
  const res = await authorizedAxiosInstance.post(`${API_URL}/api/auth/login`, user)
  return res.data.data.user
})

export const loginUserByGoogle = createAsyncThunk('auth/loginUserByGoogle', async (tokenId) => {
  const res = await authorizedAxiosInstance.post(`${API_URL}/api/auth/google`, { tokenId: tokenId })
  return res.data.data.user
})

export const loginUserByFacebook = createAsyncThunk(
  'auth/loginUserByFacebook',
  async (accessToken) => {
    const res = await authorizedAxiosInstance.post(`${API_URL}/api/auth/facebook`, {
      accessToken: accessToken
    })
    return res.data.data.user
  }
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async (showSuccessMessage = true) => {
  const res = await authorizedAxiosInstance.delete(`${API_URL}/api/auth/logout`)
  if (showSuccessMessage) toast.success(res.data.message)
  return res.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: true
  },
  // Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // extraReducer: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    // fulfilled: Bắt trường hợp Api thành công
    // Nếu không thành công Api sẽ chết ở tầng axios, nên không cần bắt các trường hợp khác
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // action.payload chính là dữ liệu trả về từ Api ở trên
        state.currentUser = action.payload
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
      })
      // Login user by Google
      .addCase(loginUserByGoogle.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUserByGoogle.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
      })
      // Login user by Facebook
      .addCase(loginUserByFacebook.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUserByFacebook.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
      })

      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null
        state.loading = false
      })
  }
})

// Có thể dùng createAsyncThunk để tạo

// export const {} = authSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector()
// để lấy dữ liệu trong kho Redex store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.auth.currentUser
}
export const selectAuth = (state) => state.auth

// Phải export reducer của slice này ra, luôn luôn phải export reducer ra
export const authReducer = authSlice.reducer
