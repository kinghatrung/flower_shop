import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import numeral from 'numeral'
import { User, ShoppingBag, Lock, Camera, Package } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { Separator } from '~/components/ui/separator'
import { selectCurrentUser } from '~/redux/slices/authSlice'
import { getMyOrders, updateMe, changePassword } from '~/api'
import { queryKeys } from '~/config/queryConfig'

const STATUS_MAP = {
  pending: { label: 'Chờ xử lý', class: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Đang xử lý', class: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Đang giao', class: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Hoàn thành', class: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Đã hủy', class: 'bg-red-100 text-red-800' }
}

const TABS = [
  { id: 'profile', label: 'Hồ sơ', icon: User },
  { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
  { id: 'password', label: 'Mật khẩu', icon: Lock }
]

// ─── Profile Tab ─────────────────────────────────────────────────────────────
function ProfileTab({ user }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      phone: user?.phone || ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await updateMe(data)
      toast.success('Cập nhật thông tin thành công')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Có lỗi xảy ra')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      {/* Avatar preview */}
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <div className='w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-primary/20'>
            <img
              src={user?.avatar_url || '/image/Nuvexa.png'}
              alt='avatar'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <div>
          <p className='font-semibold text-foreground'>
            {user?.name} {user?.lastname}
          </p>
          <p className='text-sm text-muted-foreground'>{user?.email}</p>
          <Badge variant='outline' className='text-xs mt-1'>
            {user?.role}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className='grid sm:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label htmlFor='name'>Tên</Label>
          <Input id='name' placeholder='Tên' {...register('name')} />
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='lastname'>Họ</Label>
          <Input id='lastname' placeholder='Họ' {...register('lastname')} />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='phone'>Số điện thoại</Label>
        <Input id='phone' placeholder='0901234567' {...register('phone')} />
      </div>

      <div className='space-y-1.5'>
        <Label>Email</Label>
        <Input value={user?.email || ''} disabled className='bg-muted' />
        <p className='text-xs text-muted-foreground'>Email không thể thay đổi</p>
      </div>

      <Button
        type='submit'
        className='bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full'
      >
        Lưu thay đổi
      </Button>
    </form>
  )
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['myOrders', userId],
    queryFn: () => getMyOrders(userId),
    enabled: !!userId
  })

  const orders = data?.data || []

  if (isLoading) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='h-24 rounded-xl bg-muted animate-pulse' />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className='text-center py-12'>
        <Package className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
        <p className='text-muted-foreground'>Bạn chưa có đơn hàng nào</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {orders.map((order) => {
        const status = STATUS_MAP[order.status] || {
          label: order.status,
          class: 'bg-muted text-foreground'
        }
        return (
          <div
            key={order.id}
            className='border border-border rounded-xl p-4 space-y-3 hover:shadow-sm transition-shadow'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-semibold text-sm'>{order.order_code}</p>
                <p className='text-xs text-muted-foreground'>
                  {dayjs(order.created_at).format('DD/MM/YYYY HH:mm')}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}`}
              >
                {status.label}
              </span>
            </div>

            {/* Items preview */}
            {(order.items || []).length > 0 && (
              <div className='space-y-2'>
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className='flex items-center gap-2 text-sm'>
                    <span className='flex-1 text-muted-foreground truncate'>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span className='font-medium'>{numeral(item.price).format('0,0')} đ</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className='text-xs text-muted-foreground'>
                    +{order.items.length - 2} sản phẩm khác
                  </p>
                )}
              </div>
            )}

            <Separator />
            <div className='flex justify-between text-sm font-bold'>
              <span>Tổng cộng</span>
              <span className='text-foreground'>{numeral(order.total_amount).format('0,0')} đ</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Password Tab ─────────────────────────────────────────────────────────────
function PasswordTab() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận không khớp')
      return
    }
    if (data.newPassword.length < 8) {
      toast.error('Mật khẩu mới phải có ít nhất 8 ký tự')
      return
    }
    try {
      await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword })
      toast.success('Đổi mật khẩu thành công')
      reset()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Mật khẩu cũ không đúng')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='oldPassword'>Mật khẩu hiện tại</Label>
        <Input
          id='oldPassword'
          type='password'
          placeholder='••••••••'
          {...register('oldPassword', { required: true })}
        />
      </div>
      <div className='space-y-1.5'>
        <Label htmlFor='newPassword'>Mật khẩu mới</Label>
        <Input
          id='newPassword'
          type='password'
          placeholder='••••••••'
          {...register('newPassword', { required: true, minLength: 8 })}
        />
        {errors.newPassword && <p className='text-xs text-destructive'>Tối thiểu 8 ký tự</p>}
      </div>
      <div className='space-y-1.5'>
        <Label htmlFor='confirmPassword'>Xác nhận mật khẩu mới</Label>
        <Input
          id='confirmPassword'
          type='password'
          placeholder='••••••••'
          {...register('confirmPassword', { required: true })}
        />
      </div>
      <Button
        type='submit'
        className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
      >
        Đổi mật khẩu
      </Button>
    </form>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function MyAccount() {
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='font-serif text-3xl font-bold text-foreground mb-8'>Tài khoản của tôi</h1>

        <div className='grid sm:grid-cols-4 gap-6'>
          {/* Sidebar Tabs */}
          <div className='sm:col-span-1'>
            <nav className='space-y-1'>
              {TABS.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-secondary text-secondary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className='sm:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>
                  {TABS.find((t) => t.id === activeTab)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === 'profile' && <ProfileTab user={user} />}
                {activeTab === 'orders' && <OrdersTab userId={user?.user_id} />}
                {activeTab === 'password' && <PasswordTab />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
