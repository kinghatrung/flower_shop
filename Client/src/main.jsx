import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'
import App from '~/App'
import { StoreProvider } from '~/context'
import { store } from '~/redux/store'

// Cấu hình redux presist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Inject redux store vào authorizedAxios
import { injectStore } from '~/utils/authorizedAxios'
injectStore(store)

const persistor = persistStore(store)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StoreProvider>
              <App />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </StoreProvider>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
