import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, Phone, Flower, CheckCircle2 } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { getUsers, registerUser, deleteUser, updateUser } from '~/api'

function Success() {
  const queryString = useQueryParams()
  const orderId = queryString.orderId
  const [time] = useState(() => new Date().toLocaleString('vi-VN'))

  // const { data, isLoading } = useQuery({
  //   queryKey: ['order'],
  //   queryFn: () => getUsers(page, limit, filters),
  //   keepPreviousData: true
  // })

  const steps = [
    {
      number: 1,
      icon: <Phone className='w-6 h-6' />,
      title: 'Xác nhận đơn hàng',
      description: 'Chúng tôi sẽ gọi điện xác nhận trong 30 phút',
      isActive: true,
      isCompleted: false
    },
    {
      number: 2,
      icon: <Flower className='w-6 h-6' />,
      title: 'Chuẩn bị hoa',
      description: 'Hoa tươi được chuẩn bị và đóng gói cẩn thận',
      isActive: false,
      isCompleted: false
    },
    {
      number: 3,
      icon: <Truck className='w-6 h-6' />,
      title: 'Giao hàng',
      description: 'Giao hàng trong vòng 1-2 giờ tại nội thành',
      isActive: false,
      isCompleted: false
    }
  ]

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center space-y-6 mb-12'>
          <CheckCircle className='h-24 w-24 text-green-500 mx-auto' />
          <h1 className='font-serif text-4xl font-bold text-foreground'>Đặt hàng thành công!</h1>
          <p className='text-lg text-muted-foreground'>
            Cảm ơn bạn đã tin tưởng Nuvexa. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn
            hàng.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='h-5 w-5' />
                Thông tin đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Mã đơn hàng</p>
                <p className='font-mono font-bold text-lg'>{orderId || 'BL123456'}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Trạng thái</p>
                <p className='font-medium text-primary'>Đang xử lý</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Thời gian đặt hàng</p>
                <p className='font-medium'>{time}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Phương thức thanh toán</p>
                <p className='font-medium'>Thanh toán khi nhận hàng (COD)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-6'>
              <CardTitle className='text-2xl font-bold flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center'>
                  <Truck className='w-5 h-5 text-white' />
                </div>
                Các bước tiếp theo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-0'>
                {steps.map((step, index) => (
                  <div key={step.number} className='relative'>
                    {index < steps.length - 1 && (
                      <div className='absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-rose-300 to-rose-100' />
                    )}

                    <div className='flex gap-4 pb-8'>
                      <div className='relative flex-shrink-0'>
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                            step.isCompleted
                              ? 'bg-green-100 text-green-700'
                              : step.isActive
                                ? 'bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg scale-110'
                                : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {step.isCompleted ? (
                            <CheckCircle2 className='w-7 h-7' />
                          ) : (
                            <div className='flex items-center justify-center gap-1'>
                              {step.icon}
                            </div>
                          )}
                        </div>
                        {step.isActive && (
                          <div className='absolute inset-0 rounded-full bg-rose-400 opacity-20 animate-pulse' />
                        )}
                      </div>

                      <div className='flex-1 pt-2'>
                        <h3 className='font-semibold text-lg text-gray-900 mb-1'>{step.title}</h3>
                        <p className='text-gray-600 text-sm leading-relaxed'>{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-8 pt-6 border-t border-gray-200'>
                <p className='text-sm text-gray-500 text-center'>
                  ✓ Chúng tôi cam kết giao hàng đúng giờ hoặc hoàn tiền 100%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <Card className='mt-8'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-primary' />
                <div>
                  <p className='font-medium'>Cần hỗ trợ?</p>
                  <p className='text-sm text-muted-foreground'>Liên hệ hotline: 0123 456 789</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <Button className='cursor-pointer' variant='outline'>
                  <Link to={ROUTES.PRODUCTS}>Tiếp tục mua sắm</Link>
                </Button>
                <Button className='bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'>
                  <Link to={ROUTES.HOME}>Về trang chủ</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Success
