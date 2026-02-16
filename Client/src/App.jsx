import { Fragment } from 'react'
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from '~/constants'
import { permissions } from '~/config/rbacConfig'
import DefaultLayout from '~/layouts/DefaultLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import { Toaster } from '~/components/ui/sonner'
import ScrollToTop from '~/components/common/ScrollToTop'
import ButtonZalo from './components/common/ButtonZalo'
import RbacRouter from './components/core/RbacRouter'
import { selectCurrentUser, selectAuth } from '~/redux/slices/authSlice'

import AccessDenied from '~/pages/CommonPages/AccessDenied/AccessDenied'
import NotFound from '~/pages/CommonPages/NotFound'
import Privacy from '~/pages/CommonPages/Privacy'
import Terms from '~/pages/CommonPages/Terms'

import Cart from '~/pages/PrivatePages/Cart'
import Checkout from '~/pages/PrivatePages/Checkout'
import CustomersManagement from '~/pages/PrivatePages/CustomersManagement'
import CategoriesManagement from '~/pages/PrivatePages/CategoriesManagement'
import ProductsManagement from '~/pages/PrivatePages/ProductsManagement'
import DashBoard from '~/pages/PrivatePages/DashBoard'
import SystemSettings from '~/pages/PrivatePages/SystemSettings'
import OrdersManagement from '~/pages/PrivatePages/OrdersManagement'
import ContentWebsiteManagement from './pages/PrivatePages/ContentWebsiteManagement'
import Success from '~/pages/PrivatePages/Checkout/Success'

import ForgotPassword from '~/pages/PublicPages/Auth/ForgotPassword'
import Login from '~/pages/PublicPages/Auth/Login'
import Register from '~/pages/PublicPages/Auth/Register'
import Home from '~/pages/PublicPages/Home'
import Products from '~/pages/PublicPages/Products'
import Services from '~/pages/PublicPages/Services'
import Contact from '~/pages/PublicPages/Contact'
import Product from '~/pages/PublicPages/Products/[id]'
import ButtonFacebook from '~/components/common/ButtonFacebook'
import ProtectedRoute from '~/components/common/ProtectedRoute'
import Loading from '~/components/common/Loading'
import AboutUs from '~/pages/PublicPages/AboutUs'
import Qaa from '~/pages/PublicPages/Qaa'

const Wrapper = ({ layout }) => {
  const Component = layout || Fragment
  return (
    <Component>
      <Outlet />
    </Component>
  )
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <BrowserRouter basename='/'>
      <ScrollToTop />
      <Toaster richColors position='bottom-right' />
      <ButtonZalo
        phone={import.meta.env.VITE_ZALO_PHONE}
        size={60}
        position={{ bottom: 30, right: 30 }}
      />
      <ButtonFacebook
        pageId={import.meta.env.VITE_FACEBOOK_URL}
        size={60}
        position={{ bottom: 110, right: 30 }}
      />
      <Routes>
        {/* Public */}
        <Route element={<Wrapper layout={DefaultLayout} />}>
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.ABOUTUS} element={<AboutUs />} />
          <Route path={ROUTES.QAA} element={<Qaa />} />
        </Route>
        {/* Private */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route element={<Wrapper layout={DefaultLayout} />}>
            <Route element={<RbacRouter requiredPermission={permissions.PLACE_ORDER} />}>
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
              <Route path={ROUTES.SUCCESS} element={<Success />} />
            </Route>
          </Route>
          <Route element={<Wrapper layout={AdminLayout} user={currentUser} />}>
            <Route element={<RbacRouter requiredPermission={permissions.VIEW_DASHBOARD} />}>
              <Route path={ROUTES.ADMIN_DASHBOARD} element={<DashBoard />} />
              <Route path={ROUTES.ADMIN_CUSTOMERS} element={<CustomersManagement />} />
              <Route path={ROUTES.ADMIN_CATEGORIES} element={<CategoriesManagement />} />
              <Route path={ROUTES.ADMIN_PRODUCTS} element={<ProductsManagement />} />
              <Route path={ROUTES.ADMIN_SETTINGS} element={<SystemSettings />} />
              <Route path={ROUTES.ADMIN_ORDERS} element={<OrdersManagement />} />
              <Route path={ROUTES.ADMIN_CONTENT} element={<ContentWebsiteManagement />} />
            </Route>
          </Route>
        </Route>

        {/* Common */}
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.ACCESS_DENIED} element={<AccessDenied />} />
        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
