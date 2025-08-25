import { ROUTES } from '~/constants/routesPath'

// Auth Page
import ForgotPassword from '~/pages/PublicPages/Auth/ForgotPassword'
import Login from '~/pages/PublicPages/Auth/Login'
import Register from '~/pages/PublicPages/Auth/Register'

// public page
import Home from '~/pages/PublicPages/Home'
import Products from '~/pages/PublicPages/Products'
import Services from '~/pages/PublicPages/Services'
import Contact from '~/pages/PublicPages/Contact'
import Product from '~/pages/PublicPages/Products/[id]'

// private page
import Cart from '~/pages/PrivatePages/Cart'
import Checkout from '~/pages/PrivatePages/Checkout'

// common page
import Privacy from '~/pages/CommonPages/Privacy'
import Terms from '~/pages/CommonPages/Terms'

const publicRouters = [
  { path: ROUTES.HOME, page: Home },
  { path: ROUTES.PRODUCTS, page: Products },
  { path: ROUTES.PRODUCT, page: Product },
  { path: ROUTES.LOGIN, page: Login },
  { path: ROUTES.REGISTER, page: Register },
  { path: ROUTES.FORGOT_PASSWORD, page: ForgotPassword },
  { path: ROUTES.SERVICES, page: Services },
  { path: ROUTES.CONTACT, page: Contact }
]

const privateRouters = [
  { path: ROUTES.CART, page: Cart },
  { path: ROUTES.CHECKOUT, page: Checkout }
]

const commonRouters = [
  { path: ROUTES.PRIVACY, page: Privacy },
  { path: ROUTES.TERMS, page: Terms }
]

export { publicRouters, privateRouters, commonRouters }
