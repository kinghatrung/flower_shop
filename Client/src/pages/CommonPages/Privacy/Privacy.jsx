import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import { ROUTES } from '~/constants/routesPath'

function Privacy() {
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
              <Shield className='h-12 w-12 text-primary' />
            </div>
          </div>
          <h1 className='font-serif text-4xl font-bold text-gray-900 mb-4'>Chính Sách Bảo Mật</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Nuvexa cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
          </p>
          <p className='text-sm text-gray-500 mt-2'>Cập nhật lần cuối: 20 tháng 12, 2024</p>
        </div>

        <div className='space-y-8'>
          {/* Introduction */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='h-5 w-5' />
                1. Giới Thiệu
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Chính sách bảo mật này mô tả cách Nuvexa thu thập, sử dụng và bảo vệ thông tin cá
                nhân của bạn khi sử dụng website và dịch vụ của chúng tôi.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân theo
                các tiêu chuẩn bảo mật cao nhất.
              </p>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='h-5 w-5' />
                2. Thông Tin Chúng Tôi Thu Thập
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Thông tin cá nhân:</h4>
                <ul className='list-disc list-inside space-y-1 text-gray-700 ml-4'>
                  <li>Họ tên, địa chỉ email, số điện thoại</li>
                  <li>Địa chỉ giao hàng và thanh toán</li>
                  <li>Thông tin thanh toán (được mã hóa)</li>
                  <li>Lịch sử đơn hàng và sở thích mua sắm</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className='font-semibold text-gray-900 mb-2'>Thông tin kỹ thuật:</h4>
                <ul className='list-disc list-inside space-y-1 text-gray-700 ml-4'>
                  <li>Địa chỉ IP, loại trình duyệt, hệ điều hành</li>
                  <li>Cookies và dữ liệu phiên làm việc</li>
                  <li>Thời gian truy cập và hành vi duyệt web</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UserCheck className='h-5 w-5' />
                3. Cách Chúng Tôi Sử Dụng Thông Tin
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Chúng tôi sử dụng thông tin của bạn để:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Xử lý và giao hàng đơn hàng của bạn</li>
                <li>Cung cấp dịch vụ khách hàng và hỗ trợ kỹ thuật</li>
                <li>Gửi thông báo về đơn hàng và cập nhật dịch vụ</li>
                <li>Cải thiện website và trải nghiệm người dùng</li>
                <li>Gửi email marketing (chỉ khi bạn đồng ý)</li>
                <li>Phân tích và nghiên cứu thị trường</li>
                <li>Tuân thủ các yêu cầu pháp lý</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Protection */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='h-5 w-5' />
                4. Bảo Vệ Thông Tin
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Chúng tôi áp dụng các biện pháp bảo mật sau:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải</li>
                <li>Hệ thống firewall và phần mềm chống virus</li>
                <li>Kiểm soát truy cập nghiêm ngặt</li>
                <li>Sao lưu dữ liệu định kỳ</li>
                <li>Đào tạo nhân viên về bảo mật thông tin</li>
                <li>Kiểm tra bảo mật định kỳ</li>
              </ul>
              <div className='bg-blue-50 p-4 rounded-lg mt-4'>
                <p className='text-blue-800 text-sm'>
                  <strong>Lưu ý:</strong> Mặc dù chúng tôi áp dụng các biện pháp bảo mật tốt nhất,
                  không có hệ thống nào hoàn toàn an toàn 100%. Chúng tôi khuyến khích bạn sử dụng
                  mật khẩu mạnh và không chia sẻ thông tin đăng nhập.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertTriangle className='h-5 w-5' />
                5. Chia Sẻ Thông Tin
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ
                ba, trừ các trường hợp sau:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Đối tác giao hàng để thực hiện đơn hàng</li>
                <li>Nhà cung cấp dịch vụ thanh toán</li>
                <li>Cơ quan pháp luật khi có yêu cầu hợp pháp</li>
                <li>Trong trường hợp sáp nhập hoặc mua bán công ty</li>
                <li>Khi có sự đồng ý rõ ràng từ bạn</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle>6. Quyền Của Bạn</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Bạn có các quyền sau đối với thông tin cá nhân:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
                <li>Truy cập và xem thông tin cá nhân</li>
                <li>Yêu cầu chỉnh sửa thông tin không chính xác</li>
                <li>Yêu cầu xóa thông tin cá nhân</li>
                <li>Từ chối nhận email marketing</li>
                <li>Yêu cầu sao chép dữ liệu cá nhân</li>
                <li>Khiếu nại về việc xử lý dữ liệu</li>
              </ul>
              <div className='bg-green-50 p-4 rounded-lg mt-4'>
                <p className='text-green-800 text-sm'>
                  Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email:
                  <strong> privacy@Nuvexa.vn</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle>7. Liên Hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-700 leading-relaxed'>
                Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:
              </p>
              <div className='mt-4 space-y-2 text-gray-700'>
                <p>
                  <strong>Email bảo mật:</strong> privacy@Nuvexa.vn
                </p>
                <p>
                  <strong>Email hỗ trợ:</strong> support@Nuvexa.vn
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

export default Privacy
