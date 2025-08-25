import { Link } from 'react-router-dom'
import { Scale, Shield, AlertCircle, FileText, ArrowLeft } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import { ROUTES } from '~/constants/routesPath'

function Terms() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-24 pb-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link to={ROUTES.HOME}>
            <Button
              variant='outline'
              className='cursor-pointer flex items-center gap-2 hover:bg-primary/10 bg-transparent'
            >
              <ArrowLeft className='h-4 w-4' />
              Quay về trang chủ
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-6'>
            <div className='p-4 bg-primary/10 rounded-full'>
              <Scale className='h-12 w-12 text-primary' />
            </div>
          </div>
          <h1 className='font-serif text-4xl font-bold text-gray-900 mb-4'>Điều Khoản Dịch Vụ</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ của Nuvexa
          </p>
          <p className='text-sm text-gray-500 mt-2'>Cập nhật lần cuối: 20 tháng 12, 2024</p>
        </div>

        <div className='space-y-8'>
          {/* Introduction */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5' />
                1. Giới Thiệu
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Chào mừng bạn đến với Nuvexa - nền tảng thương mại điện tử chuyên cung cấp hoa tươi
                cao cấp. Bằng cách truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ
                các điều khoản và điều kiện được nêu trong tài liệu này.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                Các điều khoản này áp dụng cho tất cả người dùng của website, bao gồm khách hàng,
                nhà cung cấp và các bên liên quan khác.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5' />
                2. Dịch Vụ Của Chúng Tôi
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>Nuvexa cung cấp các dịch vụ sau:</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Bán hoa tươi và các sản phẩm liên quan</li>
                <li>Dịch vụ giao hoa tận nơi</li>
                <li>Tư vấn và thiết kế hoa theo yêu cầu</li>
                <li>Dịch vụ hoa cho sự kiện và tiệc cưới</li>
              </ul>
              <p className='text-gray-700 leading-relaxed'>
                Chúng tôi có quyền thay đổi, tạm ngừng hoặc chấm dứt bất kỳ dịch vụ nào mà không cần
                thông báo trước.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertCircle className='h-5 w-5' />
                3. Trách Nhiệm Của Người Dùng
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Cung cấp thông tin chính xác và đầy đủ khi đặt hàng</li>
                <li>Thanh toán đầy đủ và đúng hạn cho các đơn hàng</li>
                <li>Không sử dụng website cho các mục đích bất hợp pháp</li>
                <li>Tôn trọng quyền sở hữu trí tuệ của chúng tôi</li>
                <li>Không can thiệp vào hoạt động bình thường của website</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment & Delivery */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle>4. Thanh Toán và Giao Hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Thanh toán:</h4>
                <ul className='list-disc list-inside space-y-1 text-gray-700 ml-4'>
                  <li>Chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng</li>
                  <li>Thanh toán khi nhận hàng (COD) tại một số khu vực</li>
                  <li>Giá cả có thể thay đổi mà không cần thông báo trước</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Giao hàng:</h4>
                <ul className='list-disc list-inside space-y-1 text-gray-700 ml-4'>
                  <li>Giao hàng trong vòng 2-4 giờ tại TP.HCM</li>
                  <li>Giao hàng trong 1-2 ngày tại các tỉnh thành khác</li>
                  <li>Phí giao hàng được tính theo khu vực</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle>5. Giới Hạn Trách Nhiệm</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>Nuvexa không chịu trách nhiệm cho:</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả</li>
                <li>Mất mát dữ liệu hoặc lợi nhuận</li>
                <li>Gián đoạn dịch vụ do sự cố kỹ thuật</li>
                <li>Chất lượng hoa bị ảnh hưởng bởi điều kiện thời tiết</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle>6. Liên Hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-700 leading-relaxed'>
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:
              </p>
              <div className='mt-4 space-y-2 text-gray-700'>
                <p>
                  <strong>Email:</strong> support@Nuvexa.vn
                </p>
                <p>
                  <strong>Điện thoại:</strong> 1900 1234
                </p>
                <p>
                  <strong>Địa chỉ:</strong> 123 Đường Hoa, Quận 1, TP.HCM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Terms
