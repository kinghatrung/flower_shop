import {
  ShoppingCart,
  Package,
  Frame,
  Map,
  PieChart,
  LayoutDashboard,
  TicketPercent,
  Users,
  ShieldCheck,
  Truck,
  FileText,
  CreditCard,
  Settings
} from 'lucide-react'

export const sidebarMenu = {
  navMain: [
    {
      title: 'Dash Board',
      url: '/admin/dashboard',
      icon: LayoutDashboard,
      isActive: true
    },
    {
      title: 'Quản lý sản phẩm',
      url: '/admin/products',
      isActive: true,
      icon: Package
    },
    {
      title: 'Quản lý danh mục sản phẩm',
      url: '/admin/categories',
      isActive: true,
      icon: Package
    },
    {
      title: 'Quản lý đơn hàng',
      url: '/admin/orders',
      isActive: true,
      icon: ShoppingCart
    },
    {
      title: 'Quản lý khách hàng',
      url: '/admin/customers',
      icon: Users,
      isActive: true
    },
    {
      title: 'Khuyến mãi & Mã giảm giá',
      url: '/admin/promotions',
      icon: TicketPercent,
      isActive: true
    },
    {
      title: 'Giao hàng',
      url: '/admin/transport',
      icon: Truck,
      isActive: true
    },
    {
      title: 'Nội dung Website',
      url: '/admin',
      icon: FileText,
      isActive: true
    },
    {
      title: 'Thanh toán',
      url: '/admin',
      icon: CreditCard,
      isActive: true
    },
    {
      title: 'Cài đặt hệ thống',
      url: '/admin/settings',
      icon: Settings,
      isActive: false
    }
  ],
  projects: [
    {
      name: 'Khách hàng VIP',
      url: '#',
      icon: Frame
    },
    {
      name: 'Chiến dịch Marketing',
      url: '#',
      icon: PieChart
    },
    {
      name: 'Báo cáo nhanh',
      url: '#',
      icon: Map
    }
  ]
}
