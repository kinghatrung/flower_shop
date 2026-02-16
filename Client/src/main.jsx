import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from '~/App'
import { store } from '~/redux/store'

// Cấu hình redux presist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Inject redux store vào authorizedAxios
import { injectStore } from '~/utils/authorizedAxios'
import { defaultQueryClientOptions } from '~/config/queryConfig'
injectStore(store)

const persistor = persistStore(store)
const queryClient = new QueryClient(defaultQueryClientOptions)

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
)
