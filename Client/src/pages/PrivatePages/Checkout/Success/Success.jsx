import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, Phone } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants'

function Success() {
  // const searchParams = useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const id = searchParams.get('orderId')
    setOrderId(id)
  }, [searchParams])

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
                <p className='font-medium'>{new Date().toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Phương thức thanh toán</p>
                <p className='font-medium'>Thanh toán khi nhận hàng (COD)</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Truck className='h-5 w-5' />
                Các bước tiếp theo
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5'>
                  1
                </div>
                <div>
                  <p className='font-medium'>Xác nhận đơn hàng</p>
                  <p className='text-sm text-muted-foreground'>
                    Chúng tôi sẽ gọi điện xác nhận trong 30 phút
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5'>
                  2
                </div>
                <div>
                  <p className='font-medium'>Chuẩn bị hoa</p>
                  <p className='text-sm text-muted-foreground'>
                    Hoa tươi được chuẩn bị và đóng gói cẩn thận
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5'>
                  3
                </div>
                <div>
                  <p className='font-medium'>Giao hàng</p>
                  <p className='text-sm text-muted-foreground'>
                    Giao hàng trong vòng 1-2 giờ tại nội thành
                  </p>
                </div>
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
