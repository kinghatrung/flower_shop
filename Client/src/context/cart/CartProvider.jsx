import { useReducer } from 'react'
import cartReducer from './cartReducer'
import CartContext from './CartContext'

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  })

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export default CartProvider
