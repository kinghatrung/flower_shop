import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { usePermission } from '~/hooks/usePermission'
import { roles } from '~/config/rbacConfig'
import { selectCurrentUser } from '~/redux/slices/authSlice'

function RbacRouter({ requiredPermission, redirectTo = '/access-denied', children }) {
  // Dùng children nếu phiên bản react-router-dom < 6
  const user = useSelector(selectCurrentUser)
  const userRole = user?.role || roles.CUSTOMER
  const { hasPermission } = usePermission(userRole)

  if (!hasPermission(requiredPermission)) return <Navigate to={redirectTo} replace />

  return <Outlet />
}

export default RbacRouter
