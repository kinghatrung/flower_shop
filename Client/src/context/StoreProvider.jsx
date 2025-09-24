import CartProvider from '~/context/cart/CartProvider'

function StoreProvider({ children }) {
  return <CartProvider>{children}</CartProvider>
}

export default StoreProvider
