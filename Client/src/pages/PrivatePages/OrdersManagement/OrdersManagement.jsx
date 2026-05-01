import { useState } from 'react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import numeral from 'numeral'
import { MoreVertical, Eye, RefreshCcw, Trash2 } from 'lucide-react'
import { queryKeys } from '~/config/queryConfig'
import { toast } from 'sonner'

import HeaderTable from '~/components/common/HeaderTable'
import DataTable from '~/components/common/DataTable'
import { Badge } from '~/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { FilterContainer, FilterSelect } from '~/components/common/Filters'
import CustomPagination from '~/components/common/CustomPagination'
import { getOrders, updateOrderStatus, deleteOrder, getOrderById } from '~/api'
import useQueryParams from '~/hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'

const ORDER_STATUSES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đang giao' },
  { value: 'delivered', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' }
]

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

function StatusBadge({ status }) {
  const label = ORDER_STATUSES.find((s) => s.value === status)?.label || status
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status] || 'bg-muted text-muted-foreground'}`}
    >
      {label}
    </span>
  )
}

function OrderDetailDialog({ orderId, open, onOpenChange }) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: () => getOrderById(orderId),
    enabled: open && !!orderId
  })

  const order = data?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[85vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng — {order?.order_code}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className='text-sm text-muted-foreground py-8 text-center'>Đang tải...</p>
        ) : !order ? (
          <p className='text-sm text-muted-foreground py-8 text-center'>Không tìm thấy đơn hàng</p>
        ) : (
          <div className='space-y-5'>
            {/* Customer info */}
            <div className='grid sm:grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-muted-foreground mb-1'>Khách hàng</p>
                <p className='font-medium'>{order.full_name}</p>
                <p>{order.email}</p>
                <p>{order.phone}</p>
              </div>
              <div>
                <p className='text-muted-foreground mb-1'>Địa chỉ giao hàng</p>
                <p className='font-medium'>
                  {order.address}, {order.ward}, {order.district}, {order.city}
                </p>
                <p className='text-muted-foreground mt-1'>Ghi chú: {order.note || 'Không có'}</p>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div>
              <p className='text-sm font-semibold mb-3'>Sản phẩm đặt mua</p>
              <div className='space-y-3'>
                {(order.items || []).map((item) => (
                  <div key={item.id} className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0'>
                      <img
                        src={item.images?.[0]?.url || '/image/Nuvexa.png'}
                        alt={item.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>{item.name}</p>
                      <p className='text-xs text-muted-foreground'>x{item.quantity}</p>
                    </div>
                    <p className='text-sm font-semibold'>
                      {numeral(item.price * item.quantity).format('0,0')} đ
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className='flex justify-between text-sm font-bold'>
              <span>Tổng cộng</span>
              <span>{numeral(order.total_amount).format('0,0')} đ</span>
            </div>

            {/* Meta */}
            <div className='text-xs text-muted-foreground flex justify-between'>
              <span>Thanh toán: {order.payment_method?.toUpperCase()}</span>
              <span>Ngày đặt: {dayjs(order.created_at).format('DD/MM/YYYY HH:mm')}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function UpdateStatusDialog({ order, open, onOpenChange, onSave }) {
  const [status, setStatus] = useState(order?.status || 'pending')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-muted-foreground'>
          Đơn hàng: <span className='font-semibold text-foreground'>{order?.order_code}</span>
        </p>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUSES.filter((s) => s.value !== 'all').map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex gap-3 pt-2'>
          <Button variant='outline' className='flex-1' onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground'
            onClick={() => onSave(order.id, status)}
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OrdersManagement() {
  const queryClient = useQueryClient()
  const queryString = useQueryParams()
  const navigate = useNavigate()

  const [statusFilter, setStatusFilter] = useState('all')
  const [detailOrderId, setDetailOrderId] = useState(null)
  const [updateOrder, setUpdateOrder] = useState(null)

  const page = Number(queryString.page) || 1
  const limit = 10

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.orders.list({ page, status: statusFilter }),
    queryFn: () => getOrders(page, limit, { status: statusFilter }),
    keepPreviousData: true
  })

  const orders = data?.data || []
  const pagination = data?.pagination || {}

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status)
      await queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() })
      setUpdateOrder(null)
      toast.success('Cập nhật trạng thái thành công')
    } catch {
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return
    try {
      await deleteOrder(id)
      await queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() })
      toast.success('Xóa đơn hàng thành công')
    } catch {
      toast.error('Có lỗi xảy ra')
    }
  }

  const columns = [
    {
      title: 'ID',
      render: (_, index) => (page - 1) * limit + index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    { title: 'Mã đơn hàng', key: 'order_code', skeletonClassName: 'h-4 w-24' },
    { title: 'Khách hàng', key: 'full_name' },
    { title: 'Email', key: 'email' },
    { title: 'SĐT', key: 'phone' },
    { title: 'Thanh toán', key: 'payment_method' },
    {
      title: 'Tổng tiền',
      render: (item) => numeral(item.total_amount).format('0,0') + ' đ'
    },
    {
      title: 'Trạng thái',
      render: (item) => <StatusBadge status={item.status} />
    },
    {
      title: 'Ngày đặt',
      render: (item) => dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
    }
  ]

  const actions = (item) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='size-8 cursor-pointer data-[state=open]:bg-accent/10 hover:scale-110 transition-all duration-300'
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='cursor-pointer flex items-center gap-2'
          onClick={() => setDetailOrderId(item.id)}
        >
          <Eye className='w-4 h-4' /> Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer flex items-center gap-2'
          onClick={() => setUpdateOrder(item)}
        >
          <RefreshCcw className='w-4 h-4' /> Cập nhật trạng thái
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(item.id)}
          className='text-red-600 cursor-pointer flex items-center gap-2'
        >
          <Trash2 className='w-4 h-4' /> Xóa đơn hàng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <HeaderTable
        title='Quản lý đơn hàng'
        description='Xem, cập nhật và quản lý tất cả đơn hàng'
        isShow={false}
      />

      <div className='space-y-4'>
        <FilterContainer>
          <FilterSelect
            label='Trạng thái'
            placeholder='Lọc theo trạng thái...'
            value={statusFilter}
            onChange={setStatusFilter}
            options={ORDER_STATUSES}
          />
        </FilterContainer>

        <DataTable columns={columns} data={orders} actions={actions} isLoading={isLoading} />

        {pagination.total > 0 && (
          <CustomPagination
            currentPage={page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            onPageChange={(p) => navigate(`?page=${p}`)}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
            label='Đơn hàng'
          />
        )}
      </div>

      {/* Detail Dialog */}
      <OrderDetailDialog
        orderId={detailOrderId}
        open={!!detailOrderId}
        onOpenChange={(open) => !open && setDetailOrderId(null)}
      />

      {/* Update Status Dialog */}
      {updateOrder && (
        <UpdateStatusDialog
          order={updateOrder}
          open={!!updateOrder}
          onOpenChange={(open) => !open && setUpdateOrder(null)}
          onSave={handleUpdateStatus}
        />
      )}
    </div>
  )
}

export default OrdersManagement
