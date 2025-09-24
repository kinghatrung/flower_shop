import { rolePermissions } from '~/config/rbacConfig'

function usePermission(useRole) {
  const hasPermission = (permission) => {
    const allowedPermissions = rolePermissions[useRole] || []
    return allowedPermissions.includes(permission)
  }
  return { hasPermission }
}

export { usePermission }
