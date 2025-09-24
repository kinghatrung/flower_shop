import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from '~/App'
import { StoreProvider } from '~/context'
import { store } from '~/redux/store'

// Cấu hình redux presist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Inject redux store vào authorizedAxios
import { injectStore } from '~/utils/authorizedAxios'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
