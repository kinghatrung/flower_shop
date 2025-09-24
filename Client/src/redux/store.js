import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '~/redux/slices/authSlice'

// Redux Persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root', // Key của cái persist do chúng ta chỉ định, để mặc định là root
  storage: storage, // Cơ chế lưu trữ, ở đây dùng localStorage
  whitelist: ['auth'] // Định nghĩa các slice được lưu khi f5
  // blacklist: [] // Định nghĩa các slice không được phép lưu khi f5
}

// Cấu hình root reducer
const reducers = combineReducers({
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
