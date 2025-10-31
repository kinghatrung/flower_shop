import { Outlet, Navigate } from 'react-router-dom'

import { ROUTES } from '~/constants'

function ProtectedRoute({ user }) {
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  return <Outlet />
}

export default ProtectedRoute
