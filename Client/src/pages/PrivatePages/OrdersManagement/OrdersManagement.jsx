import { useState } from 'react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import numeral from 'numeral'
import { MoreVertical } from 'lucide-react'
import { queryKeys } from '~/config/queryConfig'

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
import { Button } from '~/components/ui/button'
import { getOrders } from '~/api'

function OrdersManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.orders.lists(),
    queryFn: () => getOrders()
  })

  const orders = data?.data

  const columns = [
    {
      title: 'ID',
      // render: (item, index) => (page - 1) * limit + index + 1,
      render: (item, index) => index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    {
      title: 'Mã đơn hàng',
      key: 'order_code',
      skeletonClassName: 'h-4 w-8'
    },
    { title: 'Họ và tên', key: 'full_name' },
    { title: 'Email', key: 'email' },
    { title: 'Số điện thoại', key: 'phone' },
    { title: 'Địa chỉ', key: 'address' },
    { title: 'Ghi chú', render: (item) => item.note || 'Không có ghi chú' },
    { title: 'Thanh toán', key: 'payment_method' },
    {
      title: 'Tổng số tiền (VNĐ)',
      render: (item) => numeral(item.total_amount).format('0,0') + ' đ'
    },
    {
      title: 'Trạng thái',
      key: 'status'
    },
    {
      title: 'Ngày tạo đơn',
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
          className='cursor-pointer'

          // onClick={() => handleEditClick(item)}
        >
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onClick={() => handleDeleteProductById(item.id)}
          className='text-red-600 cursor-pointer'
        >
          Xóa sản phẩm
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <HeaderTable
        title='Quản lý đơn hàng'
        description='Quản lý thông tin các đơn hàng của người dùng'
        buttonLabel='Thêm đơn hàng'
        isShow={false}
      />

      {/* Filters */}
      <div className='space-y-4'>
        <DataTable columns={columns} data={orders} actions={actions} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default OrdersManagement
