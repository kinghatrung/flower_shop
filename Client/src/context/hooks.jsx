import { useContext } from 'react'
import Context from './Context'

function useCart() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { useCart }
