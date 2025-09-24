export const roles = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
}

export const permissions = {
  // Common
  VIEW_PRODUCTS: 'view_products',
  VIEW_PRODUCT_DETAIL: 'view_product_detail',
  // Customer
  VIEW_HOME: 'view_home',
  VIEW_CART: 'view_cart',
  VIEW_CHECKOUT: 'view_checkout',
  ADD_TO_CART: 'add_to_cart',
  PLACE_ORDER: 'place_order',
  CANCEL_ORDER: 'cancel_order',
  VIEW_OWN_ORDERS: 'view_own_orders',
  WRITE_REVIEW: 'write_review',
  // Admin
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_ADMIN_TOOLS: 'view_admin_tools',
  CREATE_PRODUCT: 'create_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
  MANAGE_USERS: 'manage_users',
  UPDATE_ORDER_STATUS: 'update_order_status',
  MANAGE_CATEGORIES: 'manage_categories',
  VIEW_ALL_ORDERS: 'view_all_orders',
  MANAGE_PROMOTIONS: 'manage_promotions',
  VIEW_REPORTS: 'view_reports'
}

export const rolePermissions = {
  [roles.CUSTOMER]: [
    permissions.VIEW_HOME,
    permissions.VIEW_CART,
    permissions.VIEW_CHECKOUT,
    permissions.VIEW_PRODUCTS,
    permissions.VIEW_PRODUCT_DETAIL,
    permissions.ADD_TO_CART,
    permissions.PLACE_ORDER,
    permissions.CANCEL_ORDER,
    permissions.VIEW_OWN_ORDERS,
    permissions.WRITE_REVIEW
  ],
  [roles.ADMIN]: Object.values(permissions)
}
