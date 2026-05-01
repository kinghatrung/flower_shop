import { useQuery } from '@tanstack/react-query'
import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import numeral from 'numeral'
import dayjs from 'dayjs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { getStatsOverview, getRevenueChart, getTopProducts, getRecentOrders } from '~/api'

const STATUS_MAP = {
  pending: { label: 'Chờ xử lý', variant: 'outline' },
  processing: { label: 'Đang xử lý', variant: 'secondary' },
  shipped: { label: 'Đang giao', variant: 'default' },
  delivered: { label: 'Hoàn thành', variant: 'success' },
  cancelled: { label: 'Đã hủy', variant: 'destructive' }
}

function StatCard({ title, value, icon: Icon, color, prefix = '', suffix = '', trend }) {
  return (
    <Card className='hover:shadow-md transition-shadow duration-200'>
      <CardContent className='pt-6'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm font-medium text-muted-foreground'>{title}</p>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            <Icon className='w-5 h-5 text-white' />
          </div>
        </div>
        <p className='text-2xl font-bold text-foreground'>
          {prefix}
          {value}
          {suffix}
        </p>
        {trend !== undefined && (
          <div className='flex items-center gap-1 mt-2 text-xs'>
            {trend >= 0 ? (
              <ArrowUpRight className='w-3 h-3 text-emerald-500' />
            ) : (
              <ArrowDownRight className='w-3 h-3 text-red-500' />
            )}
            <span className={trend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
              {Math.abs(trend)}% so với tháng trước
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-card border border-border rounded-lg p-3 shadow-lg'>
        <p className='text-xs font-semibold text-muted-foreground mb-1'>{label}</p>
        <p className='text-sm font-bold text-foreground'>
          {numeral(payload[0].value).format('0,0')} đ
        </p>
        <p className='text-xs text-muted-foreground'>{payload[1]?.value} đơn</p>
      </div>
    )
  }
  return null
}

function DashBoard() {
  const { data: overviewData, isLoading: overviewLoading } = useQuery({
    queryKey: ['stats', 'overview'],
    queryFn: getStatsOverview
  })

  const { data: chartData } = useQuery({
    queryKey: ['stats', 'revenue-chart'],
    queryFn: getRevenueChart
  })

  const { data: topProductsData } = useQuery({
    queryKey: ['stats', 'top-products'],
    queryFn: getTopProducts
  })

  const { data: recentOrdersData } = useQuery({
    queryKey: ['stats', 'recent-orders'],
    queryFn: getRecentOrders
  })

  const overview = overviewData?.data
  const chart = chartData?.data || []
  const topProducts = topProductsData?.data || []
  const recentOrders = recentOrdersData?.data || []

  return (
    <div className='container mx-auto py-8 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-foreground'>Tổng quan</h1>
        <p className='text-muted-foreground text-sm mt-1'>
          Theo dõi doanh thu, đơn hàng và hoạt động của cửa hàng
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard
          title='Tổng doanh thu'
          value={numeral(overview?.total_revenue || 0).format('0,0')}
          suffix=' đ'
          icon={TrendingUp}
          color='bg-emerald-500'
        />
        <StatCard
          title='Tổng đơn hàng'
          value={numeral(overview?.total_orders || 0).format('0,0')}
          icon={ShoppingBag}
          color='bg-blue-500'
        />
        <StatCard
          title='Khách hàng'
          value={numeral(overview?.total_customers || 0).format('0,0')}
          icon={Users}
          color='bg-violet-500'
        />
        <StatCard
          title='Sản phẩm'
          value={numeral(overview?.total_products || 0).format('0,0')}
          icon={Package}
          color='bg-orange-500'
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Doanh thu 12 tháng gần nhất</CardTitle>
        </CardHeader>
        <CardContent>
          {chart.length === 0 ? (
            <div className='h-64 flex items-center justify-center text-muted-foreground text-sm'>
              Chưa có dữ liệu doanh thu
            </div>
          ) : (
            <ResponsiveContainer width='100%' height={280}>
              <BarChart data={chart} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
                <XAxis
                  dataKey='month'
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  tickFormatter={(v) => `${numeral(v).format('0a')}đ`}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey='revenue' fill='hsl(var(--primary))' radius={[4, 4, 0, 0]} />
                <Bar dataKey='orders' fill='hsl(var(--secondary))' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className='grid lg:grid-cols-2 gap-6'>
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Top sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className='text-muted-foreground text-sm py-6 text-center'>Chưa có dữ liệu</p>
            ) : (
              <div className='space-y-3'>
                {topProducts.map((product, idx) => (
                  <div key={product.id} className='flex items-center gap-3'>
                    <span className='w-6 text-center text-sm font-bold text-muted-foreground'>
                      {idx + 1}
                    </span>
                    <div className='w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0'>
                      {product.main_image ? (
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-muted' />
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium truncate'>{product.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {numeral(product.total_sold).format('0,0')} đã bán
                      </p>
                    </div>
                    <p className='text-sm font-semibold text-foreground'>
                      {numeral(product.total_revenue).format('0,0')} đ
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className='text-muted-foreground text-sm py-6 text-center'>Chưa có đơn hàng</p>
            ) : (
              <div className='space-y-3'>
                {recentOrders.map((order) => {
                  const status = STATUS_MAP[order.status] || {
                    label: order.status,
                    variant: 'outline'
                  }
                  return (
                    <div key={order.id} className='flex items-center justify-between gap-3'>
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm font-medium truncate'>{order.full_name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {order.order_code} · {dayjs(order.created_at).format('DD/MM/YYYY')}
                        </p>
                      </div>
                      <div className='flex items-center gap-3 shrink-0'>
                        <Badge variant={status.variant} className='text-xs'>
                          {status.label}
                        </Badge>
                        <span className='text-sm font-semibold'>
                          {numeral(order.total_amount).format('0,0')} đ
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashBoard
