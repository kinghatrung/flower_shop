/**
 * React Query Configuration
 * Centralized configuration for @tanstack/react-query
 */

export const queryConfig = {
  queries: {
    // Time in milliseconds that data stays fresh
    staleTime: 1000 * 60 * 5, // 5 minutes

    // Time in milliseconds before inactive queries are garbage collected
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

    // Number of retries for failed queries
    retry: 3,

    // Delay between retries (exponential backoff)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Refetch on window focus
    refetchOnWindowFocus: false,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Refetch on mount if data is stale
    refetchOnMount: true,

    // Network mode
    networkMode: 'online'
  },

  mutations: {
    // Number of retries for failed mutations
    retry: 1,

    // Network mode for mutations
    networkMode: 'online'
  }
}

/**
 * Default options for React Query Client
 */
export const defaultQueryClientOptions = {
  defaultOptions: queryConfig
}

/**
 * Query keys factory for consistent key management
 */
export const queryKeys = {
  // Authentication
  auth: {
    all: ['auth'],
    me: () => [...queryKeys.auth.all, 'me'],
    session: () => [...queryKeys.auth.all, 'session']
  },

  // Products/Flowers
  products: {
    all: ['products'],
    lists: () => [...queryKeys.products.all, 'list'],
    list: (filters) => [...queryKeys.products.lists(), filters],
    details: () => [...queryKeys.products.all, 'detail'],
    detail: (id) => [...queryKeys.products.details(), id]
  },

  // Orders
  orders: {
    all: ['orders'],
    lists: () => [...queryKeys.orders.all, 'list'],
    list: (filters) => [...queryKeys.orders.lists(), filters],
    details: () => [...queryKeys.orders.all, 'detail'],
    detail: (id) => [...queryKeys.orders.details(), id]
  },

  // Categories
  categories: {
    all: ['categories'],
    lists: () => [...queryKeys.categories.all, 'list'],
    list: (filters) => [...queryKeys.categories.lists(), filters],
    details: () => [...queryKeys.categories.all, 'detail'],
    detail: (id) => [...queryKeys.categories.details(), id]
  },

  // Users
  users: {
    all: ['users'],
    lists: () => [...queryKeys.users.all, 'list'],
    list: (filters) => [...queryKeys.users.lists(), filters],
    details: () => [...queryKeys.users.all, 'detail'],
    detail: (id) => [...queryKeys.users.details(), id]
  },

  // Cart/Shopping Cart
  cart: {
    all: ['cart'],
    lists: () => [...queryKeys.cart.all, 'list'],
    byUser: (userId) => [...queryKeys.cart.all, userId],
    items: (userId) => [...queryKeys.cart.byUser(userId), 'items']
  },

  // Reviews
  reviews: {
    all: ['reviews'],
    lists: () => [...queryKeys.reviews.all, 'list'],
    list: (filters) => [...queryKeys.reviews.lists(), filters],
    byProduct: (productId) => [...queryKeys.reviews.all, 'product', productId],
    byUser: (userId) => [...queryKeys.reviews.all, 'user', userId]
  }
}

/**
 * Custom error handler for queries
 */
export const handleQueryError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response

    switch (status) {
      case 401:
        console.error('Unauthorized - Please login again')
        // Optionally redirect to login
        break
      case 403:
        console.error('Forbidden - You do not have permission')
        break
      case 404:
        console.error('Resource not found')
        break
      case 500:
        console.error('Internal server error')
        break
      default:
        console.error('An error occurred:', data?.message || 'Unknown error')
    }
  } else if (error.request) {
    // Request made but no response
    console.error('Network error - Please check your connection')
  } else {
    // Something else happened
    console.error('Error:', error.message)
  }
}

/**
 * Success handler for mutations
 */
export const handleMutationSuccess = (message = 'Operation successful') => {
  console.log(message)
  // You can integrate with your notification system here
}
